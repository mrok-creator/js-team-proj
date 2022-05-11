import { getFromFirebase, removeFromFirebase } from './service/firebase-api'
import { getFilmDescription } from './service/api';
import { async } from '@firebase/util';
import { movieListRef } from './ref';


const refs = {
    watchedBtn:document.querySelector('[data-btn="watched"]'),
    queueBtn: document.querySelector('[data-btn="queue"]'),
    myLibraryBtn: document.querySelector('[data-btn="myLibrary"]'),
    myLibA: document.querySelector('.library-button'),
    homeBtn: document.querySelector('.home-button'),
    homeA:document.querySelector('[data-a="myLibrary"]'),
    myLibraryBtnContainer:document.querySelector('.buttons__container'),
    inputForm:document.querySelector('.search-form'),
    gallery: document.querySelector('.list_films'),
    header:document.querySelector('.header')    

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
    refs.header.classList.add('myLib')
}

function onClickMyHomeBtn() {
  if (refs.homeBtn.classList.contains('active-page')) {
    return;
  }
  changeClassA('active-page');
  refs.myLibraryBtnContainer.classList.add('visually-hidden');
    refs.inputForm.classList.remove('visually-hidden');
     refs.header.classList.remove('myLib');
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

function onClickWatched() {
    changeClass('on', 'off');
    movieListRef.innerHTML = '';
    getFromFirebase("watched").then(res => {
     console.log(res)
        // return res.forEach(async (item) => {
        //     await getFilmDescription(item)
        //         .then(render)
        // })
        for (let i = 0; i < res.length; i += 1){
            getFilmDescription(res[i])
                .then(render)
        }
    }).catch(console.log)
}

function onClickQueue() {
    changeClass('off', 'on');
    // getFromFirebase("queued").then(res => {
    //  console.log(res)
    //     return res.map(item => {
    //         getFilmDescription(item)
    //             .then(render)
    //     })
    // }).catch(console.log)
}

// =====

function render(newPage) {
    const markupFunction = arr => {
  const { title, name, id, genres, poster_path, release_date, vote_average, first_air_date } = arr
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
    }
    const markup = markupFunction(newPage);
  
  movieListRef.insertAdjacentHTML('afterbegin', markup);


};

function renderQueue(newPage) {
    
}




myLibrary();
  



