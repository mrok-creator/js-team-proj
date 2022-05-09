import {searchFilmByName} from './js/service/api';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { input , form} from './js/ref';
import {searchFilmMarkup} from './js/markup.js'

const onInputSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.query.value.trim();
  if (inputValue.length === 0) {
        return
    };
  
    searchFilmByName(inputValue)
        .then(res => {
      
            if (res.results.length < 1) {
                Notify.warning('Халепа! Такого фільму не існує😪');
            } else {
                searchFilmMarkup(res.results)
            }
        })
        .catch(error => {
            console.log(error);
        });
};


const debounceOnInputSearch = debounce(onInputSearch, 500);

const listenerForInput = form.addEventListener('submit', onInputSearch);

export { debounceOnInputSearch, listenerForInput };