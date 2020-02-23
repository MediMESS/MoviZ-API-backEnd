const getMoviesLiked = (req, res, db) => {
  console.log("WELCOME TO GET MOVIES LIKED");
  db('movies')
    .select('*')
    .then(movies=>{
      return res.json(movies)
    })
    .catch(err => res.status(400).json('Error Movies'))
}
module.exports = {
  getMoviesLiked: getMoviesLiked,
};
