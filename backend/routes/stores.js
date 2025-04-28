const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all stores
router.get('/', async (req, res) => {
  try {
    const [stores] = await db.query(`
      SELECT 
        s.*,
        AVG(r.rating) as average_rating,
        COUNT(r.id) as rating_count
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
    `);
    
    // Format the response
    const formattedStores = stores.map(store => ({
      ...store,
      average_rating: store.average_rating ? parseFloat(store.average_rating) : null
    }));
    
    res.json(formattedStores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
});

// Get store stats for owner
router.get('/owner/:ownerId/stats', async (req, res) => {
  try {
    const [stats] = await db.query(`
      SELECT 
        AVG(r.rating) as averageRating,
        COUNT(r.id) as totalRatings
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.owner_id = ?
      GROUP BY s.owner_id
    `, [req.params.ownerId]);

    res.json(stats[0] || { averageRating: null, totalRatings: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single store
router.get('/:id', async (req, res) => {
  try {
    const [stores] = await db.query(`
      SELECT s.*, AVG(r.rating) as average_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.id = ?
      GROUP BY s.id
    `, [req.params.id]);
    
    if (stores.length === 0) {
      return res.status(404).json({ error: 'Store not found' });
    }
    
    res.json(stores[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create store (admin only)
router.post('/', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const { name, email, address, owner_id } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
      [name, email, address, owner_id]
    );
    
    res.status(201).json({ message: 'Store created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;