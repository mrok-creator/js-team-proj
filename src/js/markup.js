

import { movieListRef } from './ref'

const markupFunction = (arr) => {
    const markup = arr.map(({ title, name, id, genres, poster_path, release_date, vote_average, first_air_date }) => {
            const poster = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : " NOT FOUND";
            const filmTitle = title || name;
            const genresCard = genres?.join(', ')
            const year = new Date(release_date || first_air_date).getFullYear() || "";
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
}).join('')
        
        movieListRef.innerHTML = "";
        movieListRef.insertAdjacentHTML('afterbegin', markup);}
        
export { markupFunction }