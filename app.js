const http = require('http');
const url = require('url');
const { calculateTotal, sayHello } = require('./utils');
const { login, validateToken } = require('./auth');

// Global mutable state
let users = [];

http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === '/login' && method === 'POST') {
    let body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      const credentials = JSON.parse(body); // 💥 Bug: no try/catch
      const token = login(credentials.username, credentials.password); // 🔓 Hardcoded logic inside login
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ token: token }));
    });
  } else if (path === '/total') {
    const query = parsedUrl.query;
    const nums = query.items ? query.items.split(',').map(Number) : [];
    const total = calculateTotal(nums); // 🐞 Bug: NaN if not a number
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Total: ' + total);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(8080);

sayHello(); // ❌ Unused in real logic
