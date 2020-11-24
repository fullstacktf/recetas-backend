import express from 'express';
import { addLike, removeLike } from './controller';

const router = express.Router();

// middleware USUARIOS LOGUEADOS

router.post('/:commentID/like', async (req, res) => {
  try {
    const likes = await addLike(req.params.commentID);
    res.json({ data: likes });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:commentID/like', async (req, res) => {
  try {
    const likes = await removeLike(req.params.commentID);
    res.json({ data: likes });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
