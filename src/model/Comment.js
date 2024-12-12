const admin = require('firebase-admin');
const db = admin.firestore();

const Comment = {
  addComment: async (discussionId, userId, content) => {
    try {
      const commentRef = db.collection('discussions').doc(discussionId).collection('comments').doc();
      const commentData = {
        userId: userId,
        content: content,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      await commentRef.set(commentData);
      return commentRef.id; 
    } catch (error) {
      throw new Error('Error adding comment: ' + error.message);
    }
  },

  getCommentsByDiscussionId: async (discussionId) => {
    try {
      const snapshot = await db.collection('discussions').doc(discussionId).collection('comments').get();
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return comments;
    } catch (error) {
      throw new Error('Error fetching comments: ' + error.message);
    }
  },

  deleteComment: async (discussionId, commentId) => {
    
    try {
      await db.collection('discussions').doc(discussionId).collection('comments').doc(commentId).delete();
      return commentId; 
    } catch (error) {
      throw new Error('Error deleting comment: ' + error.message);
    }
  }
};

module.exports = Comment;
