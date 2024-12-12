const db = require('../config/firestore-config.js');

exports.likeDiscussion = async (req, res) => {
  try {
    const { discussionId, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const likeRef = db.collection('discussions')
      .doc(discussionId)
      .collection('likes')
      .doc(userId); 

    const doc = await likeRef.get();

    if (doc.exists) {
      await likeRef.delete();
      return res.status(200).json({ message: 'Like removed' });
    } else {
      await likeRef.set({ userId: userId });
      return res.status(201).json({ message: 'Discussion liked' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
