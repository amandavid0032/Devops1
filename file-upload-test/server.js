require('dotenv').config();

const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = Number(process.env.PORT || 3000);
const storageDriver = (process.env.STORAGE_DRIVER || 'local').toLowerCase();
const uploadsRoot = path.join(__dirname, 'uploads');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

let database;

function safeFolderName(email) {
  return email.toLowerCase().trim().replace(/[^a-z0-9._-]/g, '_');
}

function safeFileName(name) {
  const baseName = path.basename(name);
  return baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function buildObjectKey(email, originalName) {
  const prefix = (process.env.S3_FOLDER || 'uploads').replace(/^\/+|\/+$/g, '');
  return `${prefix}/${safeFolderName(email)}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(originalName)}`;
}

async function connectMongo() {
  const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
  await client.connect();
  database = client.db(process.env.MONGO_DB_NAME || 'file_upload_test');
  await database.collection('uploads').createIndex({ email: 1, createdAt: -1 });
  console.log(`Connected to MongoDB database: ${database.databaseName}`);
}

function s3Client() {
  if (!process.env.S3_BUCKET_NAME) {
    throw new Error('S3_BUCKET_NAME is required when STORAGE_DRIVER=s3.');
  }
  return new S3Client({ region: process.env.AWS_REGION });
}

async function saveFile(email, file) {
  const key = buildObjectKey(email, file.originalname);

  if (storageDriver === 's3') {
    await s3Client().send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    return { driver: 's3', key, location: `s3://${process.env.S3_BUCKET_NAME}/${key}` };
  }

  const relativePath = path.join(safeFolderName(email), path.basename(key));
  const absolutePath = path.join(uploadsRoot, relativePath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, file.buffer);
  return { driver: 'local', key: relativePath, location: absolutePath };
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mongoConnected: Boolean(database), storageDriver });
});

app.post('/api/uploads', upload.single('file'), async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
    if (!req.file) return res.status(400).json({ error: 'Please choose a file.' });
    if (!database) return res.status(503).json({ error: 'MongoDB is not connected yet.' });

    const saved = await saveFile(email, req.file);
    const record = {
      email,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      storage: saved,
      createdAt: new Date(),
    };
    const result = await database.collection('uploads').insertOne(record);
    res.status(201).json({ message: 'File uploaded successfully.', id: result.insertedId, upload: record });
  } catch (error) {
    next(error);
  }
});

app.get('/api/uploads/:email', async (req, res, next) => {
  try {
    if (!database) return res.status(503).json({ error: 'MongoDB is not connected yet.' });
    const email = String(req.params.email).trim().toLowerCase();
    const uploads = await database.collection('uploads').find({ email }).sort({ createdAt: -1 }).toArray();
    res.json(uploads);
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File is too large. Maximum size is 10 MB.' });
  }
  console.error(error);
  res.status(500).json({ error: error.message || 'Upload failed.' });
});

connectMongo()
  .then(() => app.listen(port, () => console.log(`Open http://localhost:${port}`)))
  .catch((error) => {
    console.error('Could not connect to MongoDB. Check MONGO_URI and start the Mongo container.', error.message);
    process.exit(1);
  });
