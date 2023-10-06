// Routes untuk Films
const express = require ('express');
const queries = require('../query');

const router = express.Router();

// Routes untuk menampilkan data seluruh list film berdasarkan category
router.get('/films_category', (req, res) => {
    const pool = req.db;
    
    // Menggunakan query untuk mendapatkan semua films berdasarkan category
    pool.query(queries.getFilmsByCategoryQuery)
        .then(result => {
            const { rows } = result;

            if (rows.length === 0) {
                res.status(404).json({ error: 'Films with categories not found'});
                console.error('Films with categories not found');
            } else {
                res.json(rows);
                // Pesan Berhasil
                console.info('Succesfully fetched films with categories');
            }
        })
        .catch (error => {
            console.error('Error fetching all films with categories: ', error);
            res.status(500).json({ error: 'Internal Server Error'});
        });
});

module.exports = router;