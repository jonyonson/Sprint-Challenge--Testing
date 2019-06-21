const express = require('express');
const Games = require('../games/gamesModel.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/games', (req, res) => {
  Games.getAll()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/games', (req, res) => {
  const { genre, title } = req.body;
  if (!genre || !title) {
    if (!genre) res.status(422).json({ error: 'Game genre is required' });
    if (!title) res.status(422).json({ error: 'Game title is required' });
  } else {
    Games.insert(req.body)
      .then(game => {
        res.status(201).json(game);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

module.exports = server;
