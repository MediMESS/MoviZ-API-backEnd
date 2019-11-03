const handleSignIn = (req, res, db, bcrypt) => {

  const {email, password} = req.body;
  if(!email || !password)
    return res.status(400).json('UNABLE TO LOG IN');

  db.select('email', 'hash').from('login')
    .where('email', email)
    .then(data => {
      loginUserFound = data[0]
      bcrypt.compare(password, loginUserFound.hash).then(isRightPassword => {
          if(isRightPassword){
            db.select('*').from('users').where('email', email)
              .then(user => res.status(200).json(user))
          }
        else
          res.status(400).json('ERROR, WRONG CREDENTIALS')
      })
    })
    .catch(err => res.status(400).json('ERROR, WRONG CREDENTIALS'));
};

module.exports = {
  handleSignIn: handleSignIn
};
