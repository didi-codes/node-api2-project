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
  Post.insert(req.body)
    .then(post => {
      if (!post) {
        res.status(400).json({
          message: 'Please provide title and contents for the post',
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'There was an error while saving the post to database',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Post.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else if (!post) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist',
        });
      } else {
        res.status(400).json({
          message: 'Please provide title and contents for the post',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be modified',
      });
    });
});

router.delete('/:id', (req, res) => {
  Post.remove(req.params.id)
    .then(count => {
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
    .catch(err => {
      res.status(500).json({
        message: 'The post could not be removed',
      });
    });
});

module.exports = router;
