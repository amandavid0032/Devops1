const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const config = require('./config');

let s3;

function s3Client() {
  if (!config.s3.bucket) throw new Error('S3_BUCKET_NAME is required when STORAGE_DRIVER=s3.');
  if (!s3) s3 = new S3Client({ region: config.s3.region });
  return s3;
}

function safeFileName(name) {
  return path.basename(name).replace(/[^a-zA-Z0-9._-]/g, '_');
}

// Resolves a stored key inside uploads/ and refuses anything that escapes the folder.
function localPath(key) {
  const absolute = path.resolve(config.uploadsRoot, key);
  if (!absolute.startsWith(path.resolve(config.uploadsRoot) + path.sep)) throw new Error('Invalid file path.');
  return absolute;
}

async function saveFile(userId, file) {
  const fileName = `${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.originalname)}`;

  if (config.storageDriver === 's3') {
    const key = `${config.s3.folder}/${userId}/${fileName}`;
    await s3Client().send(new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    return { driver: 's3', key };
  }

  const key = path.join(String(userId), fileName);
  const absolute = localPath(key);
  await fsp.mkdir(path.dirname(absolute), { recursive: true });
  await fsp.writeFile(absolute, file.buffer);
  return { driver: 'local', key };
}

async function openFile(storage) {
  if (storage.driver === 's3') {
    const result = await s3Client().send(new GetObjectCommand({ Bucket: config.s3.bucket, Key: storage.key }));
    return result.Body;
  }
  return fs.createReadStream(localPath(storage.key));
}

async function deleteFile(storage) {
  if (storage.driver === 's3') {
    await s3Client().send(new DeleteObjectCommand({ Bucket: config.s3.bucket, Key: storage.key }));
    return;
  }
  await fsp.rm(localPath(storage.key), { force: true });
}

module.exports = { saveFile, openFile, deleteFile };
