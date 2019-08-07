exports.up = knex => {
  return knex.schema.createTable('books', table => {
    table.increments();
    table
      .string('title', 255)
      .notNullable()
      .unique();
    table.string('description', 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('books');
};
