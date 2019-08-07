exports.up = knex => {
  return knex.schema.createTable('book-authors-rel', table => {
    table.increments();

    table.integer('book_id').unsigned();
    table
      .foreign('book_id')
      .references('id')
      .inTable('books')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.integer('author_id').unsigned();
    table
      .foreign('author_id')
      .references('id')
      .inTable('authors')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('book-authors-rel');
};
