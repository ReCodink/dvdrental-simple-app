const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const filmRouter = require('./routes/films');
const categoriesRouter = require('./routes/categories'); // Anda perlu mengimpor ini hanya satu kali
const filmCategoriesRouter = require('./routes/film-categories');

const app = express();
const port = 3000;

const connectDatabase = (pool) => (req, res, next) => {
    req.db = pool;
    next();
}

function readConfig() {
    try {
        const jsonConfig = fs.readFileSync('database.json', 'utf8');
        return JSON.parse(jsonConfig);
    } catch (error) {
        console.error('Error reading database.json: ', error.message);
        throw new Error('Failed to read database.json: ' + error.message);
    }
}

const startServer = () => {
    let databaseConfig;

    try {
        databaseConfig = readConfig();
        const pool = new Pool(databaseConfig);
        
        app.use(connectDatabase(pool));

        // Menggunakan route filmRouter untuk rute terkait film
        app.use('/api', filmRouter);

        // Menggunakan route categoriesRouter untuk rute terkait kategori
        app.use('/api', categoriesRouter);
        
        // Menggunakan route filmCategoriesRouter untuk rute terkait kategori film
        app.use('/api', filmCategoriesRouter);

        // Menjalankan server pada port yang telah ditentukan
        app.listen(port, () => {
            console.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server: ', error);
        process.exit(1); // Keluar dari aplikasi jika terjadi kesalahan saat memulai server
    }
};

// Panggil startServer untuk memulai server
startServer();
