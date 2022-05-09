import './sass/main.scss';
import { getPopularFilm, searchFilmByName, getFilmDescription } from './js/service/api';
import {
  authWithPopup,
  onClickSignOut,
  pushData,
  getFromFirebase,
} from './js/service/firebase-api';
