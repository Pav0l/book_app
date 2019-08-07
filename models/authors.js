const db = require('../data/db');
const Rel = require('./book-authors');

module.exports = {
  filter: query => db('authors').where(query),
  getBookAuthors: async book_id => {
    const bookAuthors = await Rel.getByBookId(book_id);
    const authorNames = [];
    for (let i = 0; i < bookAuthors.length; i++) {
      const a = bookAuthors[i].author_id;
      const [author] = await db('authors').where({ id: a });
      authorNames.push(author.name);
    }

    return authorNames;
  },
  get: () => db('authors'),
  add: author =>
    db('authors')
      .insert(author)
      .returning('id'),
  update: (id, changes) =>
    db('authors')
      .where({ id })
      .update(changes),
  delete: id =>
    db('authors')
      .where({ id })
      .del()
};
