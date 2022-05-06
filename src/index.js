import './sass/main.scss';
import { getPopularFilm, searchFilmByName, getFilmDescription } from './js/service/api';
getPopularFilm();
searchFilmByName('maestro');
getFilmDescription(26);
