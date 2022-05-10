import { movieListRef } from './ref';

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

function addMarkup(markup) {
  movieListRef.innerHTML = '';
  movieListRef.insertAdjacentHTML('afterbegin', markup);
}

function makeModalMarkup(r) {
  const markup = `
        <div class="modal">          
        <svg  class="modal__icon">
            <use href="/sprite.5ec50489.svg#icon-close"></use>
        </svg>      
        <div class="modal__wrapper">
        <img class="modal__img" src="https://image.tmdb.org/t/p/w500${r.poster_path}" alt="" />
        <div class ="modal__data-wrapper">
        <div class="modal__name">${r.title.toUpperCase()}</div>
        <div class="modal__info">
        <ul class="modal__keys">
            <li class="modal__key">Vote / Votes</li>
            <li class="modal__value"><span>${r.vote_average}</span> / <span>${r.vote_count
    }</span></li>
            <li class="modal__key">Popularity</li>
            <li class="modal__value">${r.popularity}</li>
            <li class="modal__key">Original Title</li>
            <li class="modal__value">${r.original_title}</li>
            <li class="modal__key">Genre</li>
            <li class="modal__value">${r.genres.map(e => ' ' + e.name)}</li>
        </ul>
        </div>
        <div>ABOUT</div>
        <p class="modal__descr">${r.overview}</p> 
        <div class="modal__button modal__button--trailer" >WATCH TRAILER</div>      
        <div class="modal__buttons">
        

        <div style="display: none;" class="modal__button modal__button--watched" ></div>
        <div style="display:none;"class="modal__button modal__button--q" ></button ></div > 
        </div > 
        </div > 
        </div >
        </div > `
  return markup
}

export { markupFunction, makeModalMarkup, addMarkup };
