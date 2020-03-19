const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const bcrypt = require("bcrypt");
const cors = require("cors");
const fetch = require("node-fetch");
const unirest = require("unirest");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const moviz = require("./controllers/Moviz");
const movizCard = require("./controllers/MovizCard");
const like = require("./controllers/Like");
// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString : process.env.DATABASE_URL,
//     ssl: true,
//   }
// });
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgresqlpassword",
    database: "moviz"
  }
});
let PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json(`ITs working`);
  console.log("nodemon and server running!");
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.post("/signIn", (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});
app.post("/searchMoviz", (req, res) => {
  moviz.searchMoviz(req, res, fetch, unirest);
});
app.post("/insertMovie", (req, res) => {
  movizCard.insertMovie(req, res, db);
});
app.delete("/deleteMovie/:movieId", (req, res) => {
  movizCard.deleteMovie(req, res, db);
});
app.get("/getRating/:movieId", (req, res) => {
  moviz.getRating(req, res, unirest);
});
app.get("/getLike/:movieId", (req, res) => {
  movizCard.getLike(req, res, db);
});
app.get("/getMoviesLiked", (req, res) => {
  like.getMoviesLiked(req, res, db);
});

app.listen(PORT);
