const saltRounds = 10;
const handleRegister = (req, res, db, bcrypt) => {

  // const {name, last_name, fav_movie, email, password} = req.body;
  const {
    first_name,
    url_profile_picture,
    last_name,
    favorite_movie,
    email,
    password
  } = req.body;
  const user = req.body;
  if(!email || !password || !first_name || !last_name || !favorite_movie )
    return res.status(400).json('incorrect form submission');
  console.log("WELCOME TO REGISTER", user);
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
          url_profile_picture: url_profile_picture,
          joined: new Date()
        })
        .then(user=> {
          console.log("SIGNED UPPP");
          console.log(user[0]);
          return res.status(200).json(user[0])
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
