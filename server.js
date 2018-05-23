const express = require('express');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const db = require('./db');
const routes = require('./routes');

// init express app
const app = express();

// middleware setup 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(cookieParser());
app.use(cors());

routes(app, db);

const PORT = process.env.port || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

server.on('close', () => {
  console.log('Server closed');
});