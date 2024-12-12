const db = require('../config/firestore-config.js'); 

exports.createComment = async (req, res) => {
  try {
    const { discussionId, content, userId } = req.body; 
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const newComment = {
      content: content,
      authorId: userId, 
      createdAt: new Date(),
    };

    await db.collection('discussions')
      .doc(discussionId)
      .collection('comments')
      .add(newComment);

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { discussionId, commentId } = req.params;
    if (!commentId) {
      return res.status(400).json({ message: 'commentId is required' });
    }

    const commentRef = db.collection('discussions')
      .doc(discussionId)
      .collection('comments')
      .doc(commentId);

    const doc = await commentRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // if (doc.data().authorId !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    // }

    await commentRef.delete();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
