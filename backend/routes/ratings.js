const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Submit or update rating
router.post('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const { storeId, rating } = req.body;
    const userId = req.session.user.id;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check if rating exists
    const [existingRatings] = await db.query(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [userId, storeId]
    );

    if (existingRatings.length > 0) {
      // Update existing rating
      await db.query(
        'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
        [rating, userId, storeId]
      );
      return res.json({ message: 'Rating updated successfully' });
    } else {
      // Create new rating
      await db.query(
        'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
        [userId, storeId, rating]
      );
      return res.status(201).json({ message: 'Rating submitted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's rating for a store
router.get('/:storeId', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const [ratings] = await db.query(
      'SELECT rating FROM ratings WHERE user_id = ? AND store_id = ?',
      [req.session.user.id, req.params.storeId]
    );

    if (ratings.length === 0) {
      return res.json({ rating: null });
    }

    res.json({ rating: ratings[0].rating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;