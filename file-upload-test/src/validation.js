// Lets async route handlers pass errors to Express' error handler.
function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function validEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email) && email.length <= 254;
}

function validPassword(password) {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (password.length > 128) return 'Password must be at most 128 characters.';
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return 'Password must contain letters and numbers.';
  return null;
}

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

module.exports = { asyncHandler, validEmail, validPassword, cleanText };
