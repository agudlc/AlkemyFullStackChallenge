const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index');
require('dotenv').config()
const cors = require('cors')
const session = require('express-session')


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

// pg init and config
// const { Client } = require('pg')
// const conObject = {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.PORT,
// }

// const client = new Client(conObject)
// client.connect()

// // session store and session config
// const store = new (require('connect-pg-simple')(session))({
//     conObject,
//     createTableIfMissing: true,
// })

// server.use(
//     session({
//         store: store,
//         secret: process.env.SESSION_SECRET,
//         saveUninitialized: true,
//         resave: true,
//         cookie: {
//             secure: false,
//             httpOnly: false,
//             sameSite: false,
//             maxAge: 1000 * 60 * 60 * 24,
//         },
//     })
// )


server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
