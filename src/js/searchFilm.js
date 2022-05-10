import { searchFilmByName } from './service/api';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import {
  input,
  form,
  formPagination,
  next,
  back,
  pagination,
  pagination_last,
  pagination_first,
} from './ref';
import { markupFunction } from './markup.js';

const onInputSearch = e => {
  e.preventDefault();
  const inputValue = e.target.query.value.trim();
  if (inputValue.length === 0) {
    return;
  }

  searchFilmByName(inputValue)
    .then(res => {
      if (res.results.length < 1) {
        Notify.warning('Халепа! Такого фільму не існує😪');
      } else {
        searchFilmMarkup(res.results);
        paginationFunc(res);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

const searchFilmMarkup = async em => {
  try {
    markupFunction(em);
  } catch (error) {
    console.log(error);
  }
};

let limit = 2;

const paginationFunc = arr => {
  if (limit >= arr.total_pages) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
  for (let i = limit; i <= arr.total_pages; i += 1) {
    const markup = `
                <li class='pagination_item'>
                <button name='button' class='pagination_button' type='button'>${i}</button>
                </li>
            
        `;
    const a = document.querySelectorAll('.pagination_item');
    formPagination.insertAdjacentHTML('afterbegin', markup);
    if (a.length >= 4) {
      const visuallyHiddenRm = document.querySelectorAll('.visually-hidden');
      for (const i of visuallyHiddenRm) {
        i.classList.remove('visually-hidden');
      }

      pagination_first.textContent = 1;
      pagination_last.textContent = arr.total_pages;
      return;
    } else {
      pagination_first.classList.remove('visually-hidden');
      pagination_first.textContent = 1;
    }
    if (limit < 5) {
      back.disabled = true;
    } else {
      back.disabled = false;
    }
  }
};

back.disabled = true;
const paginationFuncSecond = e => {
  e.preventDefault();
  const query = input.value;
  const page = e.target.textContent;
  if (e.target.classList.contains('next')) {
    limit = limit + 4;
    formPagination.innerHTML = '';
    searchFilmByName(query, page).then(res => {
      paginationFunc(res);
    });
  }

  if (e.target.classList.contains('back')) {
    limit = limit - 4;
    formPagination.innerHTML = '';
    searchFilmByName(query, page).then(res => {
      paginationFunc(res);
    });
  }
  if (!e.target.classList.contains('pagination_button')) {
    return;
  } else {
    searchFilmByName(query, page).then(res => {
      searchFilmMarkup(res.results);
    });
  }
  const f = document.querySelectorAll('.pagination_button');
  for (const i of f) {
    if (i.classList.contains('current')) {
      i.classList.remove('current');
    } else {
      e.target.classList.add('current');
    }
  }
};

pagination.addEventListener('click', paginationFuncSecond);

const debounceOnInputSearch = debounce(onInputSearch, 500);
const listenerForInput = form.addEventListener('submit', onInputSearch);

export { debounceOnInputSearch, listenerForInput };

const button = document.querySelector('.button__D');
