const express = require('express');
const router = express.Router();
const discussionController = require('../controller/discussionController.js');

router.get('/all', discussionController.getAllDiscussions);
router.post('/', discussionController.createDiscussion);
router.get('/user/:id', discussionController.getUserDiscussion);
router.get('/:id', discussionController.getDiscussionById);

module.exports = router;
