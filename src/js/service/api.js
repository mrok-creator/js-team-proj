// const axios = require('axios').default;
// axios.defaults.baseURL = 'https://api.themoviedb.org/';
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

// // ! 3/trending/all/day?api_key=<<api_key>>
// // ! 453647fe51ddb15dbe812a48a21b448b
// // ?3/genre/movie/list?api_key=<<api_key>>&language=en-US

// function getPopularFilm() {
//     const searchConfig = '?key=453647fe51ddb15dbe812a48a21b448b';
//     const trendFilms = '3/trending/all/day'
//     const filmsGenres = '3/genre/movie/list?'

//      try {
//          const films = await axios.get(`${trendFilms}${searchConfig}`);
//          const genres = await axios.get(`${filmsGenres}${searchConfig}`);
//         console.log(films,genres)
//   } catch (error) {
//     console.error(error);
//   }
// }
// getPopularFilm()
