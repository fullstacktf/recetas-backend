import express from 'express';
import passport from 'passport';
import { addLike, removeLike } from './controller';

const router = express.Router();

// middleware USUARIOS LOGUEADOS
router.use(passport.authenticate('jwt', {session: false}));

router.post('/:commentID/like', async (req, res) => {
  try {
    const likes = await addLike(req.params.commentID);
    res.json({ data: likes });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:commentID/like', async (req, res) => {
  try {
    const likes = await removeLike(req.params.commentID);
    res.json({ data: likes });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

export default router;
