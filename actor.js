// Module - module
const fs = require('fs');
const { Pool } = require('pg');

function readConfig() {
    try {
        const jsonConfig = fs.readFileSync('database.json', 'utf8');
        return JSON.parse(jsonConfig);
    } catch (error) {
        console.error('Error reading database.json: ', error.message);
        throw new Error('Failed to read database.json: ', error.message);
    }
}

function seedActorData() {
    try {
        const databaseConfig = readConfig();
        const pool = new Pool(databaseConfig);

        const actorData = [
            { actor_id: 206, first_name: 'Cillian', last_name: 'Murphy', last_update: '2023-10-06 20:02:32.62' },
            { actor_id: 207, first_name: 'Tom', last_name: 'Cruise', last_update: '2023-10-06 20:02:33.62' },
            { actor_id: 208, first_name: 'Brad', last_name: 'Pitt', last_update: '2023-10-06 20:02:34.62' },
            { actor_id: 209, first_name: 'Leanardo', last_name: 'DiCaprio', last_update: '2023-10-06 20:02:35.62' },
            { actor_id: 210, first_name: 'Nicolas', last_name: 'Cage', last_update: '2023-10-06 20:02:36.62' },
        ];

        actorData.forEach(actor => {
            pool.query('INSERT INTO actor (actor_id, first_name, last_name, last_update) VALUES ($1, $2, $3, $4)', [actor.actor_id, actor.first_name, actor.last_name, actor.last_update])
                .then(()=> console.info('Sending data into actor table complete.'))
                .catch(error => console.error('Error seeding data: ', error));
        });
    } catch (error) {
        console.error('Error seeding data: ', error);
    }
}

seedActorData();