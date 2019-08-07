exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('book-authors-rel')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('book-authors-rel').insert([
        { id: 10001, book_id: 10001, author_id: 10001 },
        { id: 10002, book_id: 10002, author_id: 10002 },
        { id: 10003, book_id: 10002, author_id: 10003 },
        { id: 10004, book_id: 10003, author_id: 10001 },
        { id: 10005, book_id: 10003, author_id: 10002 }
      ]);
    });
};
