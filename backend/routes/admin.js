const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Admin dashboard stats
router.get('/stats', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const [users] = await db.query('SELECT COUNT(*) as totalUsers FROM users');
    const [stores] = await db.query('SELECT COUNT(*) as totalStores FROM stores');
    const [ratings] = await db.query('SELECT COUNT(*) as totalRatings FROM ratings');

    res.json({
      totalUsers: users[0].totalUsers,
      totalStores: stores[0].totalStores,
      totalRatings: ratings[0].totalRatings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;