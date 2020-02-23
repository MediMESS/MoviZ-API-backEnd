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
const headersIMDb = {
	"x-rapidapi-host": "imdb8.p.rapidapi.com",
	// ANOTHER ONE
	"x-rapidapi-key": "8b9becc499msh8d8ee2ff8607e1bp1fd5f1jsnabdd65f4b3e5"

	// EXCEEDED QUOTA
	// "x-rapidapi-key": "7e4b4da0c9msh212d119d10b591dp1bbc79jsn423746e65581"
	// "x-rapidapi-key": "c1f1a41841mshc21febe36175ffcp16de91jsnf1ab234e62e8"
};
// Titanic: tt0120338
//
// tt0499549
const getRating = (req, res, unirest) => {
	const {movieId} = req.params;
	console.log("WELCOME TO GET RATING" , req.params);
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

const createMoviz = (movies) => {
	return movies.map(movieResult => {
		const movie = {
			id: movieResult.id.split('/')[2],
			title: movieResult.title,
			rating: "None",
			// TODO: look if the movie is liked or not in the database
			like: false,
		}
		movieResult.year ? movie["year"] = movieResult.year : movie["year"]="None";
		if(movieResult.image)
			movie["url_picture"] = movieResult.image.url
		else
			movie["url_picture"]="https://previews.123rf.com/images/scanrail/scanrail1305/scanrail130500015/19528007-cinema-movie-film-and-video-media-industry-production-concept-clapper-board-metal-film-reel-and-film.jpg";
		return movie;
	});
}

const searchMoviz = (req, res, fetch, unirest) => {
	// TODO: we can add here, if we're looking for titles or a whole movie description when clicks submit,
	// and then if title, we return everything and he can just grab the title, and in this function if title we'll return instantly the body.results instead of create
	if(req.body.input === "")
		return res.status(200).json([]);
  const {input, genre} = req.body;
  // const {input, genre} = req.body;
	unirest.get("https://imdb8.p.rapidapi.com/title/find")
	  .headers(headersIMDb)
	  .query({
	    "q": input
	  })
	  .end(resIMDb => {
	    if (resIMDb.error)
	    {
	      console.log("ERROR search Movie: ");
	      return res.status(200).json([]);
	    }
	    const imdbResults = resIMDb.body.results;
	    if(imdbResults)
	    {
				const movies = createMoviz(imdbResults.filter(imdb => imdb.titleType===genre));
				return res.status(200).json(movies)
			}
		});
}

module.exports = {
  // handleDashboard: handleDashboard,
  searchMoviz: searchMoviz,
	getRating: getRating
};
