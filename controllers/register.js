const saltRounds = 10;
const handleRegister = (req, res, db, bcrypt) => {

  // const {name, last_name, fav_movie, email, password} = req.body;
  const {first_name, last_name, favorite_movie, email, password} = req.body;
  const user = req.body;
  if(!email || !password || !first_name || !last_name || !favorite_movie )
    return res.status(400).json('incorrect form submission');
  const hash = bcrypt.hashSync(password, saltRounds);
  db.transaction(trx=> {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail =>{
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          first_name: first_name,
          last_name: last_name,
          favorite_movie: favorite_movie,
          joined: new Date()
        })
        .then(user=> {
          console.log("SIGNED UPPP");
          res.json(user[0])
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
  handleRegister: handleRegister
}
