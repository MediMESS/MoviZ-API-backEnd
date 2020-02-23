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
};

const buildDataFromIMDbResult = (imdbResult, genre) => {
  switch(genre){
    case "movie":
      const dataResult = imdbResult
        .filter(data => {return data.titleType===genre})
        .map(dataGenre => {
              const obj = {
                id: dataGenre.id.split('/')[2],
                title: dataGenre.title,
              }
              dataGenre.year ? obj["year"] = dataGenre.year : obj["year"]="None";
              if(dataGenre.image)
                obj["imageUrl"] = dataGenre.image.url
              else
                obj["imageUrl"]="https://previews.123rf.com/images/scanrail/scanrail1305/scanrail130500015/19528007-cinema-movie-film-and-video-media-industry-production-concept-clapper-board-metal-film-reel-and-film.jpg";
              return obj
            });
            return dataResult;
                    // break;
  }
}

const searchDashboard = (req, res, fetch, unirest) => {
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
                console.log("SuccessDashBoard");
                const data = resIMDb.body.results;
                if(data)
                {
                  const dataResults = buildDataFromIMDbResult(data, "movie");
                  return res.status(200).json(dataResults);
                }
                return res.status(200).json([]);

                // const dataResults2 = data
                //   .filter(data => {return data.titleType==="movie"})
                // return res.status(200).json(dataResults2);
              });
}

module.exports = {
  // handleDashboard: handleDashboard,
  searchDashboard: searchDashboard
};
