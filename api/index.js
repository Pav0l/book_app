require('dotenv').config();
const server = require('express')();

require('../middleware')(server);
require('./routes')(server);

module.exports = server;
