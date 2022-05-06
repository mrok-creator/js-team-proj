import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '453647fe51ddb15dbe812a48a21b448b',
  },
});

let genresArr = null;

// https://api.themoviedb.org/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg
// ! 453647fe51ddb15dbe812a48a21b448b

// ? 3/trending/all/day?api_key=<<api_key>> //trends
// ?3/genre/movie/list?api_key=<<api_key>>&language=en-US  //genres
// ?3/movie/mId?api_key=453647fe51ddb15dbe812a48a21b448b&language=en-USg //movie by id

async function getPopularFilm(page = 1) {
  //   const trendFilms = '3/trending/all/day';
  //   const filmsGenres = '3/genre/movie/list';

  try {
    const { data } = await instance.get(`trending/all/day`, {
      params: {
        page,
      },
    });
    const genre = await instance.get(`/genre/movie/list`);
    genresArr = genre.data.genres;

    data.results.forEach(item => {
      item.genres = getGenresNames(item.genre_ids);
    });
    data.results.forEach(item => {
      item.poster_path = getFullImageLink(item.poster_path);
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function searchFilmByName(query, page = 1) {
  try {
    const { data } = await instance.get(`search/movie`, {
      params: {
        page,
        language: 'en - US',
        include_adult: false,
        query,
      },
    });
    return data;
  } catch (error) {
    console.log(error.text);
  }
}

async function getFilmDescription(filmId) {
  try {
    const { data } = await instance.get(`movie/${filmId}`, {
      params: {
        language: 'en - US',
      },
    });
    return data;
  } catch (error) {
    console.log(error.text);
  }
}

function getGenresNames(genresIds) {
  const genresNames = genresIds.map(id => {
    const { name } = genresArr.find(item => item.id === id)
      ? genresArr.find(item => item.id === id)
      : '';
    return name;
  });
  return genresNames;
}

function getFullImageLink(poster_path) {
  const fullPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  return fullPath;
}

export { getPopularFilm, searchFilmByName, getFilmDescription };
