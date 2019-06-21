exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', g => {
    g.increments();

    g.string('title', 128).notNullable();
    g.string('genre', 128).notNullable();
    g.integer('releaseYear', 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
