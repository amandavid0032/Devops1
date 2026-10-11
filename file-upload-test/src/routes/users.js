const express = require('express');
const { db } = require('../db');
const { requireAuth, hashPassword, verifyPassword, destroySession, publicUser } = require('../auth');
const { deleteFile } = require('../storage');
const { asyncHandler, validPassword, cleanText } = require('../validation');

const router = express.Router();
router.use(requireAuth);

// Update profile details
router.put('/me', asyncHandler(async (req, res) => {
  const name = cleanText(req.body.name, 60);
  const bio = cleanText(req.body.bio, 300);
  const phone = cleanText(req.body.phone, 20);

  if (name.length < 2) return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  if (phone && !/^[0-9+\-() ]{6,20}$/.test(phone)) return res.status(400).json({ error: 'Please enter a valid phone number.' });

  const updatedAt = new Date();
  await db().collection('users').updateOne({ _id: req.user._id }, { $set: { name, bio, phone, updatedAt } });
  res.json({ message: 'Profile updated.', user: publicUser({ ...req.user, name, bio, phone, updatedAt }) });
}));

// Change password, then log out every other device
router.put('/me/password', asyncHandler(async (req, res) => {
  const currentPassword = String(req.body.currentPassword || '');
  const newPassword = String(req.body.newPassword || '');

  if (!(await verifyPassword(currentPassword, req.user.passwordHash))) {
    return res.status(400).json({ error: 'Current password is wrong.' });
  }
  const passwordError = validPassword(newPassword);
  if (passwordError) return res.status(400).json({ error: passwordError });

  await db().collection('users').updateOne(
    { _id: req.user._id },
    { $set: { passwordHash: await hashPassword(newPassword), updatedAt: new Date() } },
  );
  await db().collection('sessions').deleteMany({ userId: req.user._id, _id: { $ne: req.sessionId } });
  res.json({ message: 'Password changed. Other devices were logged out.' });
}));

// Delete account together with all files and sessions
router.delete('/me', asyncHandler(async (req, res) => {
  if (!(await verifyPassword(String(req.body.password || ''), req.user.passwordHash))) {
    return res.status(400).json({ error: 'Password is wrong.' });
  }

  const files = await db().collection('files').find({ userId: req.user._id }).toArray();
  await Promise.all(files.map((file) => deleteFile(file.storage).catch(() => {})));
  await db().collection('files').deleteMany({ userId: req.user._id });
  await db().collection('sessions').deleteMany({ userId: req.user._id });
  await db().collection('users').deleteOne({ _id: req.user._id });

  await destroySession(req, res);
  res.json({ message: 'Your account was deleted.' });
}));

module.exports = router;
