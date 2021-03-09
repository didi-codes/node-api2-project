const Post = require('./posts-model');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'The posts information could not be retrieved',
      });
    });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist',
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'The post information could not be retrieved',
      });
    });
});

module.exports = router;
