const express = require('express');
const router = express.Router();
const discussionController = require('../controller/discussionController.js');

router.post('/', discussionController.createDiscussion);
router.get('/all', discussionController.getAllDiscussions);
router.get('/user/:id', discussionController.getUserDiscussion);
router.get('/:id', discussionController.getDiscussionById);

module.exports = router;
