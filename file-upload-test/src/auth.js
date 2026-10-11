const crypto = require('crypto');
const { promisify } = require('util');
const config = require('./config');
const { db } = require('./db');

const scrypt = promisify(crypto.scrypt);
const COOKIE_NAME = 'sid';

// Passwords are stored as "salt:hash" using Node's built-in scrypt (no native modules needed).
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${hash.toString('hex')}`;
}

async function verifyPassword(password, stored) {
  const [salt, hashHex] = String(stored || '').split(':');
  if (!salt || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = await scrypt(password, salt, expected.length);
  return crypto.timingSafeEqual(expected, actual);
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function parseCookies(header = '') {
  const cookies = {};
  for (const part of header.split(';')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    cookies[part.slice(0, index).trim()] = decodeURIComponent(part.slice(index + 1).trim());
  }
  return cookies;
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.cookieSecure,
    maxAge: config.sessionDays * 24 * 60 * 60 * 1000,
    path: '/',
  };
}

// The browser only gets a random token; the database stores its SHA-256 hash.
async function createSession(res, userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  await db().collection('sessions').insertOne({
    _id: hashToken(token),
    userId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + cookieOptions().maxAge),
  });
  res.cookie(COOKIE_NAME, token, cookieOptions());
}

async function destroySession(req, res) {
  const token = parseCookies(req.headers.cookie)[COOKIE_NAME];
  if (token) await db().collection('sessions').deleteOne({ _id: hashToken(token) });
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
}

async function requireAuth(req, res, next) {
  try {
    const token = parseCookies(req.headers.cookie)[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: 'Please log in.' });

    const session = await db().collection('sessions').findOne({ _id: hashToken(token), expiresAt: { $gt: new Date() } });
    if (!session) return res.status(401).json({ error: 'Your session has expired. Please log in again.' });

    const user = await db().collection('users').findOne({ _id: session.userId });
    if (!user) return res.status(401).json({ error: 'Account not found.' });

    req.user = user;
    req.sessionId = session._id;
    next();
  } catch (error) {
    next(error);
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admins only.' });
  next();
}

// Never send the password hash to the browser.
function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio || '',
    phone: user.phone || '',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
  };
}

module.exports = {
  hashPassword,
  verifyPassword,
  createSession,
  destroySession,
  requireAuth,
  requireAdmin,
  publicUser,
};
