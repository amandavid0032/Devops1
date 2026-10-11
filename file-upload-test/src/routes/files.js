const express = require('express');
const multer = require('multer');
const config = require('../config');
const { db, toObjectId } = require('../db');
const { requireAuth } = require('../auth');
const { saveFile, openFile, deleteFile } = require('../storage');
const { asyncHandler } = require('../validation');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.maxFileSize } });

router.use(requireAuth);

function publicFile(file) {
  return {
    id: file._id,
    originalName: file.originalName,
    mimeType: file.mimeType,
    size: file.size,
    driver: file.storage.driver,
    createdAt: file.createdAt,
  };
}

async function findOwnFile(req) {
  const id = toObjectId(req.params.id);
  if (!id) return null;
  return db().collection('files').findOne({ _id: id, userId: req.user._id });
}

router.get('/', asyncHandler(async (req, res) => {
  const files = await db().collection('files').find({ userId: req.user._id }).sort({ createdAt: -1 }).toArray();
  res.json({ files: files.map(publicFile) });
}));

router.get('/stats', asyncHandler(async (req, res) => {
  const [stats] = await db().collection('files').aggregate([
    { $match: { userId: req.user._id } },
    { $group: { _id: null, count: { $sum: 1 }, totalSize: { $sum: '$size' }, lastUpload: { $max: '$createdAt' } } },
  ]).toArray();
  res.json({ count: stats?.count || 0, totalSize: stats?.totalSize || 0, lastUpload: stats?.lastUpload || null });
}));

router.post('/', upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Please choose a file.' });

  const storage = await saveFile(req.user._id, req.file);
  const record = {
    userId: req.user._id,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    storage,
    createdAt: new Date(),
  };
  const result = await db().collection('files').insertOne(record);
  res.status(201).json({ message: 'File uploaded.', file: publicFile({ ...record, _id: result.insertedId }) });
}));

router.get('/:id/download', asyncHandler(async (req, res) => {
  const file = await findOwnFile(req);
  if (!file) return res.status(404).json({ error: 'File not found.' });

  const stream = await openFile(file.storage);
  stream.on('error', () => {
    if (!res.headersSent) res.status(404).json({ error: 'File is missing from storage.' });
    else res.end();
  });
  res.setHeader('Content-Type', file.mimeType || 'application/octet-stream');
  res.attachment(file.originalName);
  stream.pipe(res);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const file = await findOwnFile(req);
  if (!file) return res.status(404).json({ error: 'File not found.' });

  await deleteFile(file.storage);
  await db().collection('files').deleteOne({ _id: file._id });
  res.json({ message: 'File deleted.' });
}));

module.exports = router;
