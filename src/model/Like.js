const admin = require('firebase-admin');
const db = admin.firestore();

const Like = {
  addLike: async (discussionId, userId) => {
    try {
      const likeRef = db.collection('discussions').doc(discussionId).collection('likes').doc(userId);
      const likeData = {
        userId: userId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      await likeRef.set(likeData); 
      return discussionId; 
    } catch (error) {
      throw new Error('Error adding like: ' + error.message);
    }
  },

  getLikesByDiscussionId: async (discussionId) => {
    try {
      const snapshot = await db.collection('discussions').doc(discussionId).collection('likes').get();
      const likes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return likes;
    } catch (error) {
      throw new Error('Error fetching likes: ' + error.message);
    }
  },

  removeLike: async (discussionId, userId) => {
    try {
      await db.collection('discussions').doc(discussionId).collection('likes').doc(userId).delete();
      return discussionId; 
    } catch (error) {
      throw new Error('Error removing like: ' + error.message);
    }
  }
};

module.exports = Like;
