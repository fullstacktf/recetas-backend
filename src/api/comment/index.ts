import express from 'express';
import { getLikes } from './controller';

const router = express.Router();

// middleware USUARIOS LOGUEADOS

router.post('/:commentID/like', async (req, res) => {
  try {
    const likes = await getLikes(req.params.commentID);
    res.json({ data: likes });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:commentID/like', (req, res) => {
  res.json();
});

export default router;
