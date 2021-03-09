const express = require('express');
const postRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('*', (req, res) => {
  res.status(200).json({
    message: 'Welcome To The Posts Database!',
  });
});

module.exports = server;
