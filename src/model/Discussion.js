const admin = require('firebase-admin');
const db = require('../config/firestore-config.js');

const Discussion = {
  createDiscussion: async (userId, title, content, category, imageUrl) => {
    try {
      const discussionRef = db.collection('discussions').doc();
      const discussionData = {
        userId: userId,
        title: title,
        content: content,
        category: category,
        imageUrl: imageUrl || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: null,
      };
      await discussionRef.set(discussionData);
      return discussionRef.id; 
    } catch (error) {
      throw new Error('Error creating discussion: ' + error.message);
    }
  },

  getAllDiscussion: async () => {
    try {
      const snapshot = await db.collection('discussions').get();
      const discussions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return discussions;
    } catch (error) {
      throw new Error('Error fetching discussions: ' + error.message);
    }
  },

  getDiscussionById: async (discussionId) => {
    try {
      const doc = await db.collection('discussions').doc(discussionId).get();
      if (!doc.exists) {
        throw new Error('Discussion not found');
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error('Error fetching discussion: ' + error.message);
    }
  },

  deleteDiscussion: async (discussionId) => {
    try {
      await db.collection('discussions').doc(discussionId).delete();
      return discussionId; 
    } catch (error) {
      throw new Error('Error deleting discussion: ' + error.message);
    }
  }
};

module.exports = Discussion;