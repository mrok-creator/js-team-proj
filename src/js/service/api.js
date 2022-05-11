import axios from 'axios';
import notFoundImg from '../../images/poster-img.jpg';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '453647fe51ddb15dbe812a48a21b448b',
  },
});
Loading.standard({
  svgColor: '#FF6B01',
});
window.addEventListener('load', () => {
  Loading.remove();
});
let genres = null;

// https://api.themoviedb.org/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg
// ! 453647fe51ddb15dbe812a48a21b448b

// ? 3/trending/all/day?api_key=<<api_key>> //trends
// ?3/genre/movie/list?api_key=<<api_key>>&language=en-US  //genres
// ?3/movie/mId?api_key=453647fe51ddb15dbe812a48a21b448b&language=en-USg //movie by id

// getGenresDescr вытягивает МАССИВ с ОБЬЕКТАМИ в которых есть АЙДИ и НАЗВАНИЕ ЖАНРОВ
async function getGenresDescr() {
  try {
    const { data } = await instance.get('/genre/movie/list');
    genres = data.genres;
  } catch (error) {
    console.error(error);
  }
}
getGenresDescr();

//запускает и показывает обьект с первой страницей в которой обьект на 20 фильмов
async function getPopularFilm(page = 1) {
  try {
    const { data } = await instance.get(`trending/movie/day`, {
      params: {
        page,
      },
    });

    data.results.forEach(item => {
      item.genres = getGenresNames(item.genre_ids);
    });
    data.results.forEach(item => {
      item.poster_path = getFullImageLink(item.poster_path);
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function searchFilmByName(query, page = 1) {
  try {
    Loading.standard({
      svgColor: '#FF6B01',
    });
    const { data } = await instance.get(`search/movie`, {
      params: {
        page,
        language: 'en - US',
        include_adult: false,
        query,
      },
    });

    data.results.forEach(item => {
      item.genres = getGenresNames(item.genre_ids);
    });

    data.results.forEach(item => {
      item.poster_path = getFullImageLink(item.poster_path);
    });
    Loading.remove();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getFilmDescription(filmId) {
  try {
    Loading.standard({
      svgColor: '#FF6B01',
    });
    const { data } = await instance.get(`movie/${filmId}`, {
      params: {
        language: 'en - US',
      },
    });
    Loading.remove();
    return data;
  } catch (error) {
    console.log(error.text);
  }
}

function getGenresNames(genresIds) {
  const genresNames = genresIds.map(id => {
    const { name } = genres.find(item => item.id === id) ? genres.find(item => item.id === id) : '';
    return name;
  });
  return genresNames;
}

function getFullImageLink(poster_path) {
  const fullPath = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : notFoundImg;
  return fullPath;
}

export { getPopularFilm, searchFilmByName, getFilmDescription };
