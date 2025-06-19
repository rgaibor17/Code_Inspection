const crypto = require('crypto');

function login(username, password) {
  // 🧨 Security vulnerability: plain-text password check
  if (username === 'admin' && password === 'admin123') {
    return crypto.randomBytes(16).toString('hex'); // 🔐 No session tracking
  }
  return null;
}

function validateToken(token) {
  // ❗ Incomplete: accepts any non-null token
  if (!token || token.length < 10) {
    return false;
  }
  return true;
}

function insecureHash(data) {
  // ❗ MD5 is deprecated
  return crypto.createHash('md5').update(data).digest('hex');
}

module.exports = {
  login,
  validateToken
};
