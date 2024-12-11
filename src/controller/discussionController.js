const db = require('../config/firestore-config.js'); 
const admin = require('firebase-admin');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const discussionModel = require('../model/Discussion.js');

// Konfigurasi multer untuk menyimpan file sementara di memori
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas 5MB
});
exports.getAllDiscussions = async (req, res) => {
  try {
      const data = await discussionModel.getAllDiscussion();

      if (!data || data.length === 0) {
          return res.status(404).json({
              status: "fail",
              message: "No discussions found"
          });
      }

      res.status(200).json({
          status: "success",
          message: "Get all discussions success",
          data: data
      });
  } catch (error) {
      console.error("Error fetching discussions:", error);

      res.status(500).json({
          status: "error",
          message: "Server Error",
          serverMessage: error.message || "Internal server error"
      });
  }
};

exports.createDiscussion = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }

    try {
      const { title, content, category, userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }

      let imageUrl = null;

      // Jika file diunggah, unggah ke Firebase Storage
      if (req.file) {
        const bucket = admin.storage().bucket();
        const fileName = `discussions/${uuidv4()}-${req.file.originalname}`;
        const file = bucket.file(fileName);

        await file.save(req.file.buffer, {
          metadata: { contentType: req.file.mimetype },
        });

          // Buat file menjadi publik
          await file.makePublic();

        // URL publik
        imageUrl = file.publicUrl();
      }

      // Buat diskusi baru
      const newDiscussion = {
        title,
        content,
        category,
        image: imageUrl || null,
        authorId: userId,
        createdAt: new Date(),
      };

      const docRef = await db.collection('discussions').add(newDiscussion);

      res.status(201).json({ id: docRef.id, ...newDiscussion });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.getUserDiscussion = async (req, res) => {
  try {
    const userId = req.params.id; 
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const userDiscussions = [];
    const snapshot = await db.collection('discussions')
      .where('authorId', '==', userId) 
      .get();

    snapshot.forEach(doc => {
      userDiscussions.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(userDiscussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussionById = async (req, res) => {
  try {
    const discussionId = req.params.id;

    if (!discussionId) {
      return res.status(400).json({ message: 'discusiionId is required' });
    }

    const docRef = db.collection('discussions').doc(discussionId);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    const discussion = doc.data();
    res.status(200).json({ id: doc.id, ...discussion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
