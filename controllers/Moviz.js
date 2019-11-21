// const unirest = require("unirest");

// fetch('http://www.omdbapi.com/?t=harry&apikey=c6d46be9')
// fetch('https://www.imdb.com/list/ls041214362/?sort=user_rating,desc&st_dt=&mode=detail&page=1')
//   .then(res => {
//     if (res.status >= 400) {
//       throw new Error("Bad response from server");
//     }
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.error(err);
//   });
var i=0;
var movies=[];

const headersIMDb = {
	"x-rapidapi-host": "imdb8.p.rapidapi.com",
	"x-rapidapi-key": "7e4b4da0c9msh212d119d10b591dp1bbc79jsn423746e65581"
	// ANOTHER ONE
	// EXCEEDED QUOTA
	// "x-rapidapi-key": "c1f1a41841mshc21febe36175ffcp16de91jsnf1ab234e62e8"
};
// tt0499549
const getRating = (req, res, unirest) => {
	const {movieId} = req.body;
	unirest.get("https://imdb8.p.rapidapi.com/title/get-ratings")
		.headers(headersIMDb)
		.query({"tconst": movieId})
		.end(resIMDb => {
			if(resIMDb.error){
				console.log("ERROR Getting Ratings");
				return res.json("None");
			}
			if(resIMDb.body.rating){
				console.log(`Id: ${movieId} ,Rating: ${resIMDb.body.rating}`);
				return res.json(resIMDb.body.rating);
			}
			return res.json("None");
		});
}

const createMoviz = (req, res, fetch, unirest) => {
	console.log("WELCOME TO CREATE MOVIE!");
	// console.log(req.body);
	// const {imdbResults} = req.body
	// return res.json("thank you");
  // switch(genre){
    // case "movie":
  var fetchMovie = () =>
	{
		// TODO: Change localhost by heroku URL, IP@
		 fetch('http://localhost:4000/getRating',{
				method:'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					"movieId":req.body.imdbResults[i].id.split('/')[2]
				})
			})
			.then(prom => prom.json())
			.then(rating =>
			{
				console.log("FOUND RATING FOR MOVIE!");
				const movieResult = req.body.imdbResults[i];
				// console.log("MOVIE RESULT", movieResult);

				const movie = {
					id: movieResult.id.split('/')[2],
					title: movieResult.title,
				}
				rating ? movie["rating"] = rating : movie["rating"]="None";
        movieResult.year ? movie["year"] = movieResult.year : movie["year"]="None";
        if(movieResult.image)
          movie["imageUrl"] = movieResult.image.url
        else
          movie["imageUrl"]="https://previews.123rf.com/images/scanrail/scanrail1305/scanrail130500015/19528007-cinema-movie-film-and-video-media-industry-production-concept-clapper-board-metal-film-reel-and-film.jpg";
        movies.push(movie);
				console.log("i == ",i, " imdbResults.length== ", req.body.imdbResults.length);
				i+=1;
				if(i === req.body.imdbResults.length)
				{
					console.log("i have arrived to the length of Movies");
					// console.log(movies);
					// return res.json(200).json("created");
					return 1;
				}
				else
					fetchMovie();
			});
		}
		fetchMovie();
		return res.json("created");
	}

const searchMoviz = (req, res, fetch, unirest) => {
	// TODO: we can add here, if we're looking for titles or a whole movie description when clicks submit,
	// and then if title, we return everything and he can just grab the title, and in this function if title we'll return instantly the body.results instead of create
  const {input} = req.body;
  // const {input, genre} = req.body;
	unirest.get("https://imdb8.p.rapidapi.com/title/find")
	  .headers(headersIMDb)
	  .query({
	    "q": input
	  })
	  .end(resIMDb => {
	    if (resIMDb.error)
	    {
	      console.log("ERROR search Movie: ", input, resIMDb.error);
	      return res.status(200).json([]);
	    }
	    // console.log("successMovizResult", resIMDb);
	    const imdbResults = resIMDb.body.results;
	    if(imdbResults)
	    {
				i = 0;
				console.log("IMDbResults, Calling the created movies");
				movies = [];
	      const moviesResult =
				fetch("http://localhost:4000/createMoviz",{
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						imdbResults: imdbResults.filter(imdb => {return imdb.titleType==="movie"})
					})
				})
				.then(prom => prom.json())
				.then(moviesCreated => {
					console.log("MOVIES CREATED ARE HERE BRO??");
					return res.status(200).json(movies)
				})
				.catch(err => {return res.status(200).json([])});
				// createMovies(unirest, fetch, data, "movie");
	      // return res.status(200).json(moviesResult);
				// fetch(getRating(unirest, "tt0499549"))
				// 	.then(prom => prom.json())
				// 	.then(data=> console.log);
	      // return res.status(200).json(moviesResult);
	    }
	  });
}

module.exports = {
  // handleDashboard: handleDashboard,
  searchMoviz: searchMoviz,
  createMoviz: createMoviz,
	getRating: getRating
};
