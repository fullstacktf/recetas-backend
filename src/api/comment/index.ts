import express from 'express';

const router = express.Router();

// middleware USUARIOS LOGUEADOS

router.post('/:commentID/like', (req, res) => {
  res.json({ message: 'OK' });
});

router.delete('/:commentID/like', (req, res) => {
  res.json();
});

export default router;
