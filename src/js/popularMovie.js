import { getPopularFilm } from './service/api';
import { markupFunction } from './markup';
import {
    first,
    formPagination,
    next,
    back,
    pagination,
    pagination_last,
    pagination_first,
    lastPoint
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

let numberCurrent = '1';
const bVH = document.querySelectorAll('.pagVisualHidden')




const paginationFunc = (arr) => {
    

    if (limit >= arr.total_pages) {
        next.disabled = true
    } else {
        next.disabled = false
    }
    formPagination.innerHTML = ''
    const bVH = document.querySelectorAll('.pagVisualHidden')
    
    for (let i = limit; i <= arr.total_pages - 1; i += 1) {
        if (arr.total_pages > 5) {
            for (const i of bVH) {
                i.classList.remove('visually-hidden')
            
            }
        }
        pagination_last.classList.remove('visually-hidden')
        pagination_last.textContent = arr.total_pages;

        const markup = `
                <li class='pagination_item'>
                <button name='button' class='pagination_button' type='button'>${i}</button>
                </li>
            
        `
        formPagination.insertAdjacentHTML('afterbegin', markup);
        
        const a = document.querySelectorAll('.pagination_item')
        const f = document.querySelectorAll('.pagination_button')
        
        for (const i of f) {
            if (i.textContent === numberCurrent) {
                i.classList.add('current')
            }
    }
        if (a.length >= 4) {
            

            pagination_first.textContent = 1;
            pagination_last.textContent = arr.total_pages;
            return
        } else {
            pagination_first.classList.remove('visually-hidden')
            pagination_first.textContent = 1;
        }
        if (limit + 4 >= arr.total_pages) {
            next.disabled = true
            lastPoint.classList.add('visually-hidden')
        } else {
            next.disabled = false
            lastPoint.classList.remove('visually-hidden')
        }
        if (limit < 5) {
            
            first.classList.add('visually-hidden')
            back.disabled = true
        } else {
            first.classList.remove('visually-hidden')
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
    numberCurrent = e.target.innerText
    const f = document.querySelectorAll('.pagination_button')
    for (const i of f) {

        if (i.classList.contains('current')) {
            i.classList.remove('current')
        } else {
            e.target.classList.add('current')
        }
    }
    if (e.target === pagination_last) {
        if (!pagination_last.classList.contains('current')) {
            pagination_last.classList.add('current') 
        } else {
            pagination_last.classList.remove('current')
        }
    }

}

pagination.addEventListener('click', paginationFuncSecondPopular)

export { paginationFuncSecondPopular }
export { paginationFunc}



