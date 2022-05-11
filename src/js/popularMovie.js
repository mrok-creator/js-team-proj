import { getPopularFilm } from './service/api';
import { markupFunction } from './markup';
import {
    formPagination,
    next,
    back,
    pagination,
    pagination_last,
    pagination_first,
} from './ref';

const loadPopular = async (page) => {
  try {
    const movies = await getPopularFilm(page);
    const arr = movies.results
    markupFunction(arr)
    paginationFunc(movies)
  } catch (error) {
    console.log(error);
  }
};
loadPopular();
export { loadPopular };

  
  
// pagination




let limit = 2;


const paginationFunc = (arr) => {

    if (limit >= arr.total_pages) {
        next.disabled = true
    } else {
        next.disabled = false
    }
    formPagination.innerHTML = ''
    for (let i = limit; i <= arr.total_pages; i += 1) {

        const markup = `
                <li class='pagination_item'>
                <button name='button' class='pagination_button' type='button'>${i}</button>
                </li>
            
        `
        formPagination.insertAdjacentHTML('afterbegin', markup);
        const a = document.querySelectorAll('.pagination_item')
        if (a.length >= 4) {
            const visuallyHiddenRm =  pagination.querySelectorAll('.visually-hidden')
            for (const i of visuallyHiddenRm) {
                i.classList.remove('visually-hidden')
            }

            pagination_first.textContent = 1;
            pagination_last.textContent = arr.total_pages;
            return
        } else {
            pagination_first.classList.remove('visually-hidden')
            pagination_first.textContent = 1;
        }
        if (limit < 5) {

            back.disabled = true
        } else {
            back.disabled = false

        }

    }

}


back.disabled = true
const paginationFuncSecondPopular = (e) => {
    e.preventDefault()
    const page = e.target.textContent;
    if (e.target.classList.contains('next')) {
      limit = limit + 4;
      console.log(page)
        formPagination.innerHTML = ''
        getPopularFilm().then(res => {
          paginationFunc(res)
        })
    }

    if (e.target.classList.contains('back')) {
        limit = limit - 4;
        formPagination.innerHTML = ''
        getPopularFilm().then(res => {
          paginationFunc(res)
        })
    }
    if (!e.target.classList.contains('pagination_button')) {
        return
    } else {
      getPopularFilm(page).then(res => {
          markupFunction(res.results)
        })
    }
    const f = document.querySelectorAll('.pagination_button')
    for (const i of f) {

        if (i.classList.contains('current')) {
            i.classList.remove('current')
        } else {
            e.target.classList.add('current')
        }
    }

}

pagination.addEventListener('click', paginationFuncSecondPopular)

export { paginationFuncSecondPopular }
export { paginationFunc}



