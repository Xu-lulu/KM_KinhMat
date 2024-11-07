"use strict";

var express = require('express');

var morgan = require('morgan');

var env = require('dotenv').config();

var db = require('./config/db');

var router = require('./routers');

var cors = require('cors');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/uploads', express["static"]('uploads'));
router(app);
db.connect();
app.listen(process.env.port, function () {
  console.log("Example app listening at http://localhost:".concat(process.env.port));
});