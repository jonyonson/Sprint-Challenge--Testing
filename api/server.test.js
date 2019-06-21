const supertest = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

describe('', () => {
  beforeEach(async () => {
    await db('games').truncate();
  });

  describe('GET /', () => {
    it('responds with status code 200', () => {
      return supertest(server)
        .get('/')
        .expect(200);
    });

    it('should return a JSON object', async () => {
      await supertest(server)
        .get('/')
        .expect('Content-Type', /json/i);
    });

    it('responds {api: "running"}', async () => {
      await supertest(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual({ api: 'running' });
        });
    });
  });

  describe('POST /games', () => {
    it('should return a JSON object', async () => {
      const game = {
        title: 'Wolfenstein',
        genre: 'first-person shooter',
        releaseYear: 1992,
      };
      await supertest(server)
        .post('/games')
        .send(game)
        .expect('Content-Type', /json/i);
    });

    it('should return status code 201', async () => {
      const game = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      };
      const response = await supertest(server)
        .post('/games')
        .send(game);
      expect(response.status).toEqual(201);
    });

    it('should return a 422 when genre not passed', async () => {
      const res = await supertest(server)
        .post('/games')
        .send({ title: 'Pacman' });
      expect(res.status).toEqual(422);
    });

    it('should return a 422 when title not passed', async () => {
      const res = await supertest(server)
        .post('/games')
        .send({ genre: 'Arcade' });

      expect(res.status).toEqual(422);
    });
  });

  describe('GET /games', () => {
    it('responds with 200 ok', () => {
      return supertest(server)
        .get('/games')
        .expect(200);
    });

    it('should return a JSON object', async () => {
      await supertest(server)
        .get('/games')
        .expect('Content-Type', /json/i);
    });
  });
});
