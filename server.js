const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt');
const cors = require('cors');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgresqlpassword',
    database : 'moviz'
  }
});
let PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json(`ITs working`)
  console.log('nodemon and server running!');
  console.log(HEROKU_URL);
})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.post('/signIn', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});

app.listen(PORT);
