import express from 'express';
import pg from 'pg';

const { Pool } = pg;
let pgConnectionConfigs;
const pool = new Pool(pgConnectionConfigs);

const PORT = process.env.PORT || 3004;

// test to see if the env var is set. Then we know we are in Heroku
if (process.env.DATABASE_URL) {
  // pg will take in the entire value and use it to connect
  pgConnectionConfigs = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  // this is the same value as before
  pgConnectionConfigs = {
    user: '<MY_UNIX_USERNAME>',
    host: 'localhost',
    database: '<MY_UNIX_USERNAME>',
    port: 5432,
  };
}

// Initialise Express
const app = express();

app.set('view engine', 'ejs');

app.get('/bananas', (request, response) => {
  const responseText = `This is a random number: ${Math.random()}`;

  pool.query('SELECT * FROM cats').then((result) => {
    const cats = result.rows;

    console.log('request came in', responseText);

    const data = responseText;

    response.render('bananas', { data, cats });
  });
});

app.listen(PORT);
