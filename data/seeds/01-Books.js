exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('books').insert([
        { id: 10001, title: 'bookTitle1', description: 'bookDesc1' },
        { id: 10002, title: 'bookTitle2', description: 'bookDesc2' },
        { id: 10003, title: 'bookTitle3', description: 'bookDesc3' }
      ]);
    });
};
