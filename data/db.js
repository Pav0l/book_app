const db = require('knex');
const knexConfig = require('../knexfile');

const dbEnv = process.env.NODE_ENV || 'development';

module.exports = db(knexConfig[dbEnv]);
