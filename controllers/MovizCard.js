const insertMovie = (req, res, db) => {
  const movie = {
    id: req.body.movie.id,
    id_user: req.body.movie.id_user,
    title: req.body.movie.title,
    year: parseInt(req.body.movie.year),
    rating: parseFloat(req.body.movie.rating),
    url_picture: req.body.movie.url_picture,
    state: req.body.movie.state
  }
  db('movies')
    .returning('*')
    .insert({
      id: movie.id,
      id_user: movie.id_user,
      title: movie.title,
      year: parseInt(movie.year),
      rating: parseFloat(movie.rating),
      url_picture: movie.url_picture,
      state: movie.state
    })
    .then(movie=>{
      return res.json(movie[0]);
    })
    .catch(err=> res.status(400).json("ERROR Server Can't insert"))
}

const deleteMovie = (req, res, db) => {
  const {movieId} = req.params;
  db('movies').returning('*')
    .where({id: movieId})
    .del()
    .then(movie=>{
      return res.json(movie[0]);
    })
    .catch(error=> res.status(400).json("error: Delete Movie"));
}

const getLike = (req, res, db) => {
  const {movieId} = req.params;
  db('movies')
    .select('*')
    .where({id: movieId})
    .then(like=>{
      return res.json(like)
    })
    .catch(err => res.status(400).json(false))
}
module.exports = {
  insertMovie: insertMovie,
  deleteMovie: deleteMovie,
  getLike: getLike,
};
