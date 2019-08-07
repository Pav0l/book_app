const path = require('../../util/paths');
const authorsRouter = require('./authors');
const booksRouter = require('./books');

module.exports = server => {
  server.use(path.authors, authorsRouter);
  server.use(path.books, booksRouter);

  server.get('/', (req, res) => {
    res.status(200).json('Server is alive!');
  });
};
