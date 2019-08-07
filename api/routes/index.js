const path = require('../../util/paths');

module.exports = server => {
  server.get('/', (req, res) => {
    res.status(200).json('Server is alive!');
  });
};
