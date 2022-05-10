// const html = document.querySelector('html');
// const checkbox = document.querySelector('input[name=theme]');
// const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style);
// const initialColors = {
//   bg: getStyle(html, '--bg'),
// };
// const darkMode = {
//   bg: '#333333', // override styles here
// };
// const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase();
// const changeColors = colors => {
//   Object.keys(colors).map(key => html.style.setProperty(transformKey(key), colors[key]));
// };
// checkbox.addEventListener('change', ({ target }) => {
//   target.checked ? changeColors(darkMode) : changeColors(initialColors);
// });
// const isExistLocalStorage = key => localStorage.getItem(key) != null;
// const createOrEditLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
// const getValeuLocalStorage = key => JSON.parse(localStorage.getItem(key));
// checkbox.addEventListener('change', ({ target }) => {
//   if (target.checked) {
//     changeColors(darkMode);
//     createOrEditLocalStorage('mode', 'darkMode');
//   } else {
//     changeColors(initialColors);
//     createOrEditLocalStorage('mode', 'initialColors');
//   }
// });
// if (!isExistLocalStorage('mode')) createOrEditLocalStorage('mode', 'initialColors');
// if (getValeuLocalStorage('mode') === 'initialColors') {
//   checkbox.removeAttribute('checked');
//   changeColors(initialColors);
// } else {
//   checkbox.setAttribute('checked', '');
//   changeColors(darkMode);
// }

import { getFilmDescription } from '../service/api';
import { getFromFirebase } from '../service/firebase-api';

async function onWatchedClick() {
  // 1 Намалювать розмітку:
  // * получить айді
  //* по айді получить данні фільмів
  //* по данних намалювать галерею
   await getFromFirebase('watched').then(res => {
    return res.map(i => getFilmDescription(i));
  }).then(res => {
      renderWatched(res);
  }).catch(console.log)
}

renderWatched(arr){
    
    // 
}