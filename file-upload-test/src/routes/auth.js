const express = require('express');
const { db } = require('../db');
const {
  hashPassword, verifyPassword, createSession, destroySession, requireAuth, publicUser,
} = require('../auth');
const { asyncHandler, validEmail, validPassword, cleanText } = require('../validation');

const router = express.Router();

router.post('/register', asyncHandler(async (req, res) => {
  const name = cleanText(req.body.name, 60);
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (name.length < 2) return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  if (!validEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  const passwordError = validPassword(password);
  if (passwordError) return res.status(400).json({ error: passwordError });

  const users = db().collection('users');
  if (await users.findOne({ email })) return res.status(409).json({ error: 'An account with this email already exists.' });

  // The very first account becomes the admin so you can try the admin page.
  const role = (await users.estimatedDocumentCount()) === 0 ? 'admin' : 'user';
  const now = new Date();
  const user = {
    name,
    email,
    passwordHash: await hashPassword(password),
    role,
    bio: '',
    phone: '',
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  };

  try {
    const result = await users.insertOne(user);
    user._id = result.insertedId;
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'An account with this email already exists.' });
    throw error;
  }

  await createSession(res, user._id);
  res.status(201).json({ message: 'Account created.', user: publicUser(user) });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  const user = await db().collection('users').findOne({ email });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Wrong email or password.' });
  }

  const lastLoginAt = new Date();
  await db().collection('users').updateOne({ _id: user._id }, { $set: { lastLoginAt } });
  await createSession(res, user._id);
  res.json({ message: 'Logged in.', user: publicUser({ ...user, lastLoginAt }) });
}));

router.post('/logout', asyncHandler(async (req, res) => {
  await destroySession(req, res);
  res.json({ message: 'Logged out.' });
}));

router.post('/logout-all', requireAuth, asyncHandler(async (req, res) => {
  await db().collection('sessions').deleteMany({ userId: req.user._id });
  await destroySession(req, res);
  res.json({ message: 'Logged out from all devices.' });
}));

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

module.exports = router;
