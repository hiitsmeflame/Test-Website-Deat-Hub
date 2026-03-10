const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'web'), {
  maxAge: '1d',
  etag: false
}));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

let visitors = 0;
let totalVisitors = Math.floor(Math.random() * 5000) + 1000;
const visitorSockets = new Set();

io.on('connection', (socket) => {
  visitors++;
  totalVisitors++;
  visitorSockets.add(socket.id);
  
  io.emit('visitors', { current: visitors, total: totalVisitors });
  
  socket.on('terminal-input', (data) => {
    const responses = [
      'Executing nuker module...',
      'Bypassing Discord security...',
      'Loading bot configuration...',
      'Connecting to Discord API...',
      'Initializing destroy sequence...',
      'Access granted. Welcome, operator.',
      'Server wipe complete.',
      'All channels deleted.',
      'Roles removed successfully.',
      'Emojis purged.',
    ];
    
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      socket.emit('terminal-output', randomResponse);
    }, 100 + Math.random() * 500);
  });
  
  socket.on('disconnect', () => {
    visitors--;
    visitorSockets.delete(socket.id);
    io.emit('visitors', { current: visitors, total: totalVisitors });
  });
});

app.get('/api/visitors', (req, res) => {
  res.json({ current: visitors, total: totalVisitors });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   💀 DEATH HUB SERVER 💀                  ║
║                                           ║
║   Server running at:                      ║
║   http://localhost:${PORT}                 ║
║                                           ║
║   Features:                               ║
║   ✓ Socket.io Real-time                   ║
║   ✓ Gzip Compression                       ║
║   ✓ Live Visitor Counter                   ║
║   ✓ Terminal Simulator                     ║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});
