const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController');

router.post('/', likeController.likeDiscussion);

module.exports = router;