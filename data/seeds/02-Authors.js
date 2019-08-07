exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authors')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('authors').insert([
        { id: 1, name: 'author1' },
        { id: 2, name: 'author2' },
        { id: 3, name: 'author3' }
      ]);
    });
};
