const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

router.post('/', commentController.createComment);
router.delete('/:discussionId/:commentId', commentController.deleteComment);

module.exports = router;
