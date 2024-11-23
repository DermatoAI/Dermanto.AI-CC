exports.getUserProfile = async (req, res) => {
    const userId = req.user.id; 
    try {
      const [rows] = await db.query("SELECT id, email, username FROM users WHERE id = ?", [userId]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }
  
      res.status(200).json({ user: rows[0] });
    } catch (err) {
      res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
    }
  };
  