const db = require('../data/dbConfig');

const { insert, getAll } = require('./gamesModel');

describe('games model', () => {
  beforeEach(async () => {
    await db('games').truncate();
  });

  describe('insert()', async () => {
    it('should add the provided game', async () => {
      const pacman = { title: 'Pacman', genre: 'arcade' };
      await insert(pacman);
      const games = await db('games');
      expect(games).toHaveLength(1);
    });
  });

  describe('getAll()', () => {
    it('should return all games in the db', async () => {
      let gameList = await db('games');
      expect(gameList).toHaveLength(0);

      const games = [
        { title: 'Pacman', genre: 'arcade' },
        { title: 'Wolfenstein', genre: 'first-person shooter' },
      ];

      await insert(games[0]);
      await insert(games[1]);

      gameList = await db('games');
      expect(gameList).toHaveLength(2);
    });
  });
});
