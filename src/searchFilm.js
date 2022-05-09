import {searchFilmByName} from './js/service/api';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { input } from './js/ref';
const onInputSearch = (e) => {
    const inputValue = e.target.value.trim();

  if (inputValue.length === 0) {
        return
    };
  
    searchFilmByName(inputValue)
        .then(res => {
      
            if (res.results.length < 1) {
                Notify.warning('Халепа! Такого фільму не існує😪');
            } else {
                console.log(res.results)
            }
        })
        .catch(error => {
            console.log(error);
        });
};


const debounceOnInputSearch = debounce(onInputSearch, 500);

const listenerForInput = input.addEventListener('input', debounceOnInputSearch);

export { debounceOnInputSearch, listenerForInput };