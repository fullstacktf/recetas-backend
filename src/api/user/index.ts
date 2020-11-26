import express from 'express';
import { createUser, getUserById, getUsers, setUserPass } from './controller';

const router = express.Router();

router.post('/login', (req, res) => {
  res.json({});
});

router.post('/register', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});

router.get('/:userID/profile', async (req, res) => {
  try {
    const user = await getUserById(req.params.userID);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// middleware USUARIOS LOGUEADOS

router.put('/password/reset', async (req, res) => {
  try {
    const user = await setUserPass(
      req.body.userID,
      req.body.pass,
      req.body.newPass
    );
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.get('/:userID/timeline', (req, res) => {
  res.json({});
});

router.put(':userID/profile', (req, res) => {
  res.json({});
});

router.post('/:userID/follow', (req, res) => {
  res.json({});
});

router.delete('/:userID/follow', (req, res) => {
  res.json({});
});

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

export default router;
