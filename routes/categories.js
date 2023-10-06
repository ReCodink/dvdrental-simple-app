// Routes untuk Categories
const express = require ('express');
const queries = require('../query');

const router = express.Router();

// Routes untuk menampilkan data seluruh list category
router.get('/categories', (req, res) => {
    const pool = req.db;
    
    // Menggunakan query untuk mendapatkan semua Categories
    pool.query(queries.getAllCategoriesQuery)
        .then(result => {
            const { rows } = result;

            if (rows.length === 0) {
                res.status(404).json({ error: 'All Categories not found'});
                console.error('All Categories not found');
            } else {
                res.json(rows);
                // Pesan Berhasil
                console.info('Succesfully fetched all categories');
            }
        })
        .catch (error => {
            console.error('Error fetching all categories: ', error);
            res.status(500).json({ error: 'Internal Server Error'});
        });
});

module.exports = router;