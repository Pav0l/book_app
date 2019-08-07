exports.up = knex => {
  return knex.schema.createTable('authors', table => {
    table.increments();
    table
      .string('name', 255)
      .notNullable()
      .unique();
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('authors');
};
