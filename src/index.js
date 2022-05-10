import './sass/main.scss';
import './js/properties/dark-mode.js';
import { getPopularFilm, searchFilmByName, getFilmDescription } from './js/service/api';

import {
  authWithPopup,
  onClickSignOut,
  pushData,
  getFromFirebase,
} from './js/service/firebase-api';
import Darkmode from 'darkmode-js';
import { makeFilmModal } from './js/modal';
import { debounceOnInputSearch, listenerForInput } from './js/searchFilm';

import { libraryBtn, loginBtn, logOutBtn } from './js/ref';

import { loadPopular } from './js/popularMovie';

import { onScroll, onUpBtnClick } from './js/properties/scroll';

const darkmode = new Darkmode({
  // the position of the toggle button
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff', // default: '#fff'
  buttonColorDark: '#054f05', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: false,
});
darkmode.showWidget();
darkmode.toggle();

isUserSignIn();
onScroll();
onUpBtnClick();

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
  localStorage.clear();
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
