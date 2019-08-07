require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.LOCAL_DB_DEV,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'pg',
    connection: process.env.LOCAL_DB_TEST,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    }
  }
};
