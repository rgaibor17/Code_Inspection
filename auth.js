import crypto from 'crypto';

// Simple in-memory users (hashed passwords in real-world app)
const users = {
  admin: 'admin123',
  user: 'password'
};

export function login(username, password) {
  const storedPassword = users[username];
  if (storedPassword && storedPassword === password) {
    // In real applications: use JWT or session tokens
    return crypto.randomBytes(16).toString('hex');
  }
  return null;
}
