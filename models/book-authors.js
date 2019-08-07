const db = require('../data/db');

module.exports = {
  getByBookId: book_id => db('book-authors-rel').where({ book_id }),
  getByAuthorId: author_id => db('book-authors-rel').where({ author_id }),
  get: () => db('book-authors-rel'),
  add: rel => db('book-authors-rel').insert(rel),
  update: (id, changes) =>
    db('book-authors-rel')
      .where({ id })
      .update(changes),
  delete: id =>
    db('book-authors-rel')
      .where({ id })
      .del()
};
