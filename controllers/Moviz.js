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

const headers = {
	"x-rapidapi-host": "imdb8.p.rapidapi.com",
	"x-rapidapi-key": "c1f1a41841mshc21febe36175ffcp16de91jsnf1ab234e62e8"
	// ANOTHER ONE
	// "x-rapidapi-key": "7e4b4da0c9msh212d119d10b591dp1bbc79jsn423746e65581"
};
// tt0499549
getRating = (unirest, movieId) => {
	reqIMDb = unirest.get("https://imdb8.p.rapidapi.com/title/get-ratings")
							.headers(headers)
							.query({"tconst": movieId})
							.end(resIMDb => {
								if(resIMDb.error){
									console.log("ERROR Getting Ratings");
									return "None";
									// return ;
								}
								if (resIMDb.body)
								{
									// console.log(resIMDb.body)
									return (resIMDb.body.rating);
								}
							});
	console.log(reqIMDb);
}
const createMovies = (unirest, imdbResult, genre) => {
  switch(genre){
    case "movie":
      const moviesResult = imdbResult
        .filter(result => {return result.titleType===genre})
        .map(movieResult => {
              const movie = {
                id: movieResult.id.split('/')[2],
                title: movieResult.title,
              }
              movieResult.year ? movie["year"] = movieResult.year : movie["year"]="None";
              if(movieResult.image)
                movie["imageUrl"] = movieResult.image.url
              else
                movie["imageUrl"]="https://previews.123rf.com/images/scanrail/scanrail1305/scanrail130500015/19528007-cinema-movie-film-and-video-media-industry-production-concept-clapper-board-metal-film-reel-and-film.jpg";



							movie["rating"] = getRating(unirest, movie.id);
							console.log(movie["rating"]);
              return movie
            });
            return moviesResult;
                    // break;
  }
}

const searchMoviz = (req, res, fetch, unirest) => {
  const {input} = req.body;
  // const {input, genre} = req.body;
  reqIMDb = unirest.get("https://imdb8.p.rapidapi.com/title/find")
              .headers(headers)
              .query({
                "q": input
              })
              .end(resIMDb => {
                if (resIMDb.error)
                {
                  console.log("ERROR SearchDashboard");
                  return res.status(200).json([]);
                }
                console.log("successMovizResult");
                const data = resIMDb.body.results;
                if(data)
                {
                  // const moviesResult = createMovies(unirest, data, "movie");
                  // return res.status(200).json(moviesResult);
									fetch(getRating(unirest, "tt0499549"))
										.then(prom => prom.json())
										.then(data=> console.log);
                  return res.status(200).json("Hello");
                }
                return res.status(200).json([]);

                // const dataResults2 = data
                //   .filter(data => {return data.titleType==="movie"})
                // return res.status(200).json(dataResults2);
              });
}

module.exports = {
  // handleDashboard: handleDashboard,
  searchMoviz: searchMoviz
};
