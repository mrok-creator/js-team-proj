import { getPopularFilm } from './api'

const movieListRef = document.querySelector('.list_films')
const loadPopular = async ()=>{
    try {
        const movies = await getPopularFilm()
        const markup = movies.map(({ title, name, id, genres, poster_path, release_date, vote_average, first_air_date }) => {
            
            const poster = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : " NOT FOUND";
            const filmTitle = title || name;
            const genresCard = genres?.join(', ')
            const year = new Date(release_date || first_air_date).getFullYear() || "";
            const rating = vote_average || '0.0';
            return ` <li id='${id}' class="movies__item">
                        <a href="" class="movies__link">
                            <img class="movies__img" src="${poster}" alt="${filmTitle}">
                            <div class="movies__wrapper">
                                <h2 class="movies__name">${filmTitle}</h2>
                                <div class="movies__wrapper--data">
                                    <span class="movies__genre">${genresCard}</span>
                                    <span class="movies__year">${year}</span>
                                    <span class="movies__rating">${rating}</span>
                                </div>
                            </div>
                        </a>
                     </li>`;
        }).join('')
        console.log(markup)

        movieListRef.innerHTML = "";
        movieListRef.insertAdjacentHTML('afterbegin', markup);

    } catch (error) {
        console.log(error)
    }
}

loadPopular()
export {loadPopular}