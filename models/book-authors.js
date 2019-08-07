const db = require('../data/db');

module.exports = {
  get: () => db('book-authors-rel'),
  filter: query => db('book-authors-rel').where(query),
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
