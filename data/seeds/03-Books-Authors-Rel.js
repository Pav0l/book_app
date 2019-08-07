exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('book-authors-rel')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('book-authors-rel').insert([
        { id: 1, book_id: 1, author_id: 1 },
        { id: 2, book_id: 2, author_id: 2 },
        { id: 3, book_id: 2, author_id: 3 },
        { id: 4, book_id: 3, author_id: 1 },
        { id: 5, book_id: 3, author_id: 2 }
      ]);
    });
};
