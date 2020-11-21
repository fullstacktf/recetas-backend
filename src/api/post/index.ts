import express from 'express';

const router = express.Router();

/*
	GET     api/v1/posts/public/popular
    GET		api/v1/posts/{PostID}
    POST	api/v1/posts/{postID}/like
    DELETE	api/v1/posts/{postID}/like
    POST	api/v1/posts/{postID}/comment
    PUT		api/v1/posts/{postID}/comment
    DELETE	api/v1/posts/{postID}/comment
    POST	api/v1/posts/{postID}/save
    DELETE	api/v1/posts/{postID}/save
	GET		api/v1/posts/tag/{tagID}

	GET		api/v1/posts/{postID}/save
	POST	api/v1/posts
    PUT		api/v1/posts/{postID}
    DELETE	api/v1/posts/{postID}
*/

router.get('/public/popular', (req, res) => {
  res.json();
});

router.get('/login', (req, res) => {
  res.json();
});

router.get('/login', (req, res) => {
  res.json();
});

router.get('/login', (req, res) => {
  res.json();
});
