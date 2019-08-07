const db = require('../data/db');
const Author = require('./authors');

module.exports = {
  getById: async id => {
    let [book] = await db('books').where({ id });

    if (book) {
      book.authors = await Author.getBookAuthors(book.id);
    }
    return book;
  },
  get: () => db('books'),
  getDetailed: async () => {
    let books = await db('books');

    for (let book of books) {
      book.authors = await Author.getBookAuthors(book.id);
    }
    return books;
  },
  add: book =>
    db('books')
      .insert(book)
      .returning('id'),
  update: (id, changes) =>
    db('books')
      .where({ id })
      .update(changes),
  delete: id =>
    db('books')
      .where({ id })
      .del()
};
