// Routes untuk Films
const express = require ('express');
const queries = require('../query');

const router = express.Router();

// Routes untuk menampilkan data seluruh list film
router.get('/films', (req, res) => {
    const pool = req.db;
    
    // Menggunakan query untuk mendapatkan semua films
    pool.query(queries.getAllFilmsQuery)
        .then(result => {
            const { rows } = result;
            if (rows.length === 0) {
                res.status(404).json({ error: 'All Films not found'});
                console.error('All Films not found');
            } else {
                res.json(rows);
                // Pesan Berhasil
                console.info('Succesfully fetched all films');
            }
        })
        .catch (error => {
            console.error('Error fetching all films: ', error);
            res.status(500).json({ error: 'Internal Server Error'});
        });
});

router.get('/films/:id', (req, res) => {
    const pool = req.db;
    const filmId = req.params.id;

    // Menggunakan query untuk mendapatkan detail film berdasarkan ID
    pool.query(queries.getFilmByIdQuery, [filmId])
        .then(result => {
            const { rows } = result;

            if (rows.length === 0) {
                res.status(404).json({ error: 'Film not found'});
                console.error('Film not found');
            } else {
                res.json(rows);
                // Pesan Berhasil
                console.info(`Succesfully fetched film by ID: ${filmId}`);
            }
        })
        .catch(error => {
            console.error(`Error fetching film by ID: ${filmId}`, error);
            res.status(500).json({ error: 'Internal Server Error'});
        });
});

module.exports = router;