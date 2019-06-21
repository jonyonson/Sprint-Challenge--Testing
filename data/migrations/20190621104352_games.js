exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', g => {
    g.increments();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
