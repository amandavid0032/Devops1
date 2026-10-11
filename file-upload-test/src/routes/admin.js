const express = require('express');
const { db, toObjectId } = require('../db');
const { requireAuth, requireAdmin } = require('../auth');
const { deleteFile } = require('../storage');
const { asyncHandler } = require('../validation');

const router = express.Router();
router.use(requireAuth, requireAdmin);

// All users with how many files they uploaded
router.get('/users', asyncHandler(async (_req, res) => {
  const users = await db().collection('users').aggregate([
    { $sort: { createdAt: -1 } },
    { $lookup: { from: 'files', localField: '_id', foreignField: 'userId', as: 'files' } },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        email: 1,
        role: 1,
        createdAt: 1,
        lastLoginAt: 1,
        fileCount: { $size: '$files' },
        totalSize: { $sum: '$files.size' },
      },
    },
  ]).toArray();
  res.json({ users });
}));

router.patch('/users/:id/role', asyncHandler(async (req, res) => {
  const id = toObjectId(req.params.id);
  const role = req.body.role;
  if (!id) return res.status(404).json({ error: 'User not found.' });
  if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Role must be "user" or "admin".' });
  if (id.equals(req.user._id)) return res.status(400).json({ error: 'You cannot change your own role.' });

  const result = await db().collection('users').updateOne({ _id: id }, { $set: { role, updatedAt: new Date() } });
  if (!result.matchedCount) return res.status(404).json({ error: 'User not found.' });
  res.json({ message: `Role changed to ${role}.` });
}));

router.delete('/users/:id', asyncHandler(async (req, res) => {
  const id = toObjectId(req.params.id);
  if (!id) return res.status(404).json({ error: 'User not found.' });
  if (id.equals(req.user._id)) return res.status(400).json({ error: 'Use the profile page to delete your own account.' });

  const files = await db().collection('files').find({ userId: id }).toArray();
  await Promise.all(files.map((file) => deleteFile(file.storage).catch(() => {})));
  await db().collection('files').deleteMany({ userId: id });
  await db().collection('sessions').deleteMany({ userId: id });
  const result = await db().collection('users').deleteOne({ _id: id });
  if (!result.deletedCount) return res.status(404).json({ error: 'User not found.' });
  res.json({ message: 'User deleted.' });
}));

module.exports = router;
