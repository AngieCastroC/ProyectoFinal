const { Pool } = require('pg');

const pool = new Pool({
    user: 'default',
    host: 'ep-young-truth-33984257-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'V2qWDv6IxtQL',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});


const listUsersQuery = `SELECT * FROM obras;`;

pool.query(listUsersQuery)
    .then(res => {
        console.log("List obras: ", res.rows);
        pool.end();
    })
    .catch(err => {
        console.error(err);
        pool.end();
    });
