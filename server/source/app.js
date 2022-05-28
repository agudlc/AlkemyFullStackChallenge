const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index');
require('dotenv').config();
const cors = require('cors');


require('./db');

const server = express();

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(
  cors({
      origin: 'http://localhost:3000',
      methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
      credentials: true,
  })
)

server.use('/api', routes);


server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
