import http from 'http';
import url from 'url';
import { calculateTotal } from './utils.js';
import { login } from './auth.js';

// Server entry point
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === '/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const credentials = JSON.parse(body);
        const token = login(credentials.username, credentials.password);
        if (!token) {
          res.writeHead(401);
          return res.end('Unauthorized');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token }));
      } catch (err) {
        console.error('Invalid JSON in request body:', err.message); // ✅ log the error
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
        }
    });
  } else if (path === '/total') {
    const items = parsedUrl.query.items?.split(',').map(Number) || [];
    const validItems = items.filter(n => !isNaN(n));
    const total = calculateTotal(validItems);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Total: ' + total);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
