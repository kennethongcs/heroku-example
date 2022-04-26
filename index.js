import express from 'express';
import pg from 'pg';

const { pool } = pg;

const PORT = process.env.PORT || 3004;

// Initialise Express
const app = express();

app.set('view engine', 'ejs');

app.get('/bananas', (request, response) => {
  const responseText = `This is a random number: ${Math.random()}`;

  // pool.query('SELECT * FROM cats').then((result) => {
  //   const cats = result.rows;

  // });
  console.log('request came in', responseText);

  const data = { responseText, cats };

  response.render('bananas', data);
});

app.listen(PORT);
