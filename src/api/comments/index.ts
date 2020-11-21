import express from 'express';

const router = express.Router();

// middleware USUARIOS LOGUEADOS

router.post('/:commentID/like', (req, res) => {
  res.json();
});

router.delete('/:commentID/like', (req, res) => {
  res.json();
});
