import './sass/main.scss';

import * as basicLightbox from 'basiclightbox'
function get() {
    fetch("https://api.themoviedb.org/3/movie/629542/images?api_key=453647fe51ddb15dbe812a48a21b448b&language=en-US")
        .then(r => { return r.json() })
        .then(r => console.log(r))
}
get()
const instance = basicLightbox.create(`
    <div class="modal">
        
      <button type="button">
        <svg style="width: 30px; height: 30px" class="close-icon">
          <use href="./sprite.svg#icon-close" style="width: 30px; stroke: black"></use>
        </svg>
      </button>
      <img src="" alt="" />
      <span></span>
      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <span></span>
      <span></span>
      <button type="button">add to watched</button>
      <button type="button">add to queue</button>
   
        <a>Close</a>
    </div>
`, {
    onShow: (instance) => {
        instance.element().querySelector('a').onclick = instance.close
    }
})

instance.show()