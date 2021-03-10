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

router.post('/', (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      message: 'Please provide title and contents for the post',
    });
  } else {
    Post.insert(newPost)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: 'There was an error while saving the post to the database',
        });
      });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    if (!changes.title || !changes.contents) {
      res.status(400).json({
        message: 'Please provide title and contents for the post',
      });
    } else {
      const updatedPost = await Post.update(id, changes);
      if (!updatedPost) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist',
        });
      } else {
        res.status(200).json(updatedPost);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: 'The post information could not be modified',
    });
  }
});

router.delete('/:id', (req, res) => {
  Post.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: 'Post has been successfully removed',
        });
      } else {
        res.status(404).json({
          message: 'The post with the ID does not exist',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'The post could not be removed',
      });
    });
});

router.get('/:id/comments', (req, res) => {
  Post.findPostComments(req.params.id)
    .then((posts) => {
      if (!posts) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist',
        });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'The comments information could not be retrieved',
      });
    });
});

router.get('/id:/comments/:id', (req, res) => {
  Post.findCommentById(req.params.id)
    .then((posts) => {
      if (!posts) {
        res.status(404).json({
          message: 'The comment with the specified ID does not exist',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'The comment could not be retrieved',
      });
    });
});

module.exports = router;
