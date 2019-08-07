exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authors')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('authors').insert([
        { id: 10001, name: 'author1' },
        { id: 10002, name: 'author2' },
        { id: 10003, name: 'author3' }
      ]);
    });
};
