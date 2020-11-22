import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ message: 'OK' });
});

router.post('/register', (req, res) => {
  res.json();
});

router.get(':userID/profile', (req, res) => {
  res.json();
});

// middleware USUARIOS LOGUEADOS

router.put('/password/reset', (req, res) => {
  res.json();
});

router.get('/:userID/timeline', (req, res) => {
  res.json();
});

router.put(':userID/profile', (req, res) => {
  res.json();
});

router.post('/:userID/follow', (req, res) => {
  res.json();
});

router.delete('/:userID/follow', (req, res) => {
  res.json();
});

export default router;
