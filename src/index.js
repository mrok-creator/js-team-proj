import './sass/main.scss';
import { getPopularFilm, searchFilmByName, getFilmDescription } from './js/service/api';

import {
  authWithPopup,
  onClickSignOut,
  pushData,
  getFromFirebase,
} from './js/service/firebase-api';
import { makeFilmModal } from './js/modal';
import { debounceOnInputSearch, listenerForInput } from './js/searchFilm';

import { libraryBtn, loginBtn, logOutBtn } from './js/ref';

import { loadPopular } from './js/popularMovie';


isUserSignIn();

loginBtn.addEventListener('click', authWithPopup);
logOutBtn.addEventListener('click', onClickSignOut);

function authAccess(user) {
  if (!user) return;
  hideItems(libraryBtn, false);
  hideItems(logOutBtn, false);
  hideItems(loginBtn);
}

function authDecline() {
  hideItems(loginBtn, false);
  hideItems(libraryBtn);
  hideItems(logOutBtn);
  localStorage.clear()
}

function hideItems(ref, flag = true) {
  if (flag) {
    ref.classList.add('visually-hidden');
  } else {
    ref.classList.remove('visually-hidden');
  }
}

async function isUserSignIn() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    onClickSignOut();
  } else {
  }
}

export { authAccess, authDecline };
