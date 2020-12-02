import express from 'express';
import {
  getPost,
  getPostByTag,
  addPostLike,
  removePostLike,
  addPostComment,
  removePostComment,
  createPost,
  removePost,
  getPostByLikes,
  editPostComment,
  savePost,
  deleteSavePost,
  getSavePost,
  editPost
} from './controller';

const router = express.Router();

router.get('/public/popular', async (req, res) => {
  try {
    const posts = await getPostByLikes();
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.get('/:postID', async (req, res) => {
  try {
    const post = await getPost(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.get('/tag/:tagID', async (req, res) => {
  try {
    const posts = await getPostByTag(req.params.tagID);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// middleware USUARIOS LOGUEADOS

router.post('/:postID/like', async (req, res) => {
  try {
    const post = await addPostLike(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:postID/like', async (req, res) => {
  try {
    const post = await removePostLike(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.post('/:postID/comment', async (req, res) => {
  try {
    const comment = await addPostComment(req.params.postID, req.body);
    res.status(200).json({ data: comment });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.put('/:postID/comment', async (req, res) => {
  try {
    const comment = await editPostComment(req.body.commentID, req.body.text);
    res.status(200).json({ data: comment });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:postID/comment', async (req, res) => {
  try {
    const comment = await removePostComment(
      req.params.postID,
      req.body.commentID
    );
    res.status(200).json({ data: comment });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.post('/:postID/save', async (req, res) => {
  try {
    const post = await savePost(req.params.postID, req.body.userID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:postID/save', async (req, res) => {
  try {
    const post = await deleteSavePost(req.params.postID, req.body.userID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// No le veo sentido
router.get('/:postID/save', async (req, res) => {
  try {
    const posts = await getSavePost(req.body.userID);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.put('/:postID', async (req, res) => {
  try {
    const post = await editPost(req.params.postID, req.body);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.delete('/:postID', async (req, res) => {
  try {
    const post = await removePost(req.params.postID);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

export default router;
