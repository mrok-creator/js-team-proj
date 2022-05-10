import { getFromFirebase, removeFromFirebase } from './service/firebase-api'
import { getFilmDescription } from './service/api';
import { async } from '@firebase/util';

const refs = {
    watchedBtn:document.querySelector('[data-btn="watched"]'),
    queueBtn: document.querySelector('[data-btn="queue"]'),
    myLibraryBtn: document.querySelector('[data-btn="myLibrary"]'),
    myLibA: document.querySelector('.library-button'),
    homeBtn: document.querySelector('.home-button'),
    homeA:document.querySelector('[data-a="myLibrary"]'),
    myLibraryBtnContainer:document.querySelector('.buttons__container'),
    inputForm:document.querySelector('.search-form'),
    gallery:document.querySelector('.list_films'),
    
};

// =====
function onClickMyLibraryBtn() {
    if (refs.myLibA.classList.contains('active-page')) {
    return;
    }
    changeClassA('active-page')
    changeClass('on', 'off');
    refs.myLibraryBtnContainer.classList.remove('visually-hidden');
    refs.inputForm.classList.add('visually-hidden')
}

function onClickMyHomeBtn() {
  if (refs.homeBtn.classList.contains('active-page')) {
    return;
  }
  changeClassA('active-page');
  refs.myLibraryBtnContainer.classList.add('visually-hidden');
  refs.inputForm.classList.remove('visually-hidden');
}

function myLibrary() {
    refs.myLibraryBtn.addEventListener('click', onClickMyLibraryBtn);
    refs.homeBtn.addEventListener('click', onClickMyHomeBtn);
    refs.watchedBtn.addEventListener('click', onClickWatched);
    refs.queueBtn.addEventListener('click', onClickQueue);
}

function changeClassA(classA) {
  refs.myLibA.classList.toggle(classA);
  refs.homeBtn.classList.toggle(classA);
}

function changeClass(add, remove) {
    refs.watchedBtn.classList.add(add);
    refs.watchedBtn.classList.remove(remove);
    refs.queueBtn.classList.add(remove);
    refs.queueBtn.classList.remove(add);
}

async function onClickWatched() {
    changeClass('on', 'off');
    const arrId = await getFromFirebase("watched").then(res => {
        return res.map(item => getFilmDescription(item))
    }).then(res => {
        renderWatched(res);
    }).catch(console.log)
    console.log(arrId)
    // const dataArr = await arrId.map(item => {
    //     getFilmDescription(item);
    // }) 
    
    // const result = await renderWatched(dataArr);  

}

async function onClickQueue() {
    changeClass('off', 'on');
    const arrId = await getFromFirebase("queued").then(res => {
        return res.map(item => getFilmDescription(item))
    }).then(res => {
        renderQueue(res);
    }).catch(console.log)
    console.log(arrId)
}

// =====

function renderWatched(newPage) {
    const markupFunction = arr => {
  const markup = arr
    .map(({ title, name, id, genres, poster_path, release_date, vote_average, first_air_date }) => {
      const poster = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : ' NOT FOUND';
      const filmTitle = title || name;
      const genresCard = genres?.join(', ');
      const year = new Date(release_date || first_air_date).getFullYear() || '';
      const rating = vote_average || '0.0';
      return ` <li id='${id}' class="movies">
                        <a href="" class="movies__link">
                            <img class="movies__img" src="${poster}" alt="${filmTitle}">
                            <div class="movies__wrapper">
                                <h2 class="movies__name">${filmTitle}</h2>
                                <div class="movies__wrapper--data">
                                    <span class="movies__genre">${genresCard} |</span>
                                    <span class="movies__year">${year}</span>
                                    <span class="movies__rating">${rating}</span>
                                </div>
                            </div>
                        </a>
                     </li>`;
    })
    .join('');

  addMarkup(markup);
};
}

function renderQueue(newPage) {
    
}

myLibrary();
  


