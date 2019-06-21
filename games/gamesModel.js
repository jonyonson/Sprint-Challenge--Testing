const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  getAll,
};

function insert(game) {
  return db('games').insert(game);
}

function getAll() {
  return db('games');
}
