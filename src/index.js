import './sass/main.scss';
import * as basicLightbox from 'basiclightbox'
// function get() {
//     fetch("https://api.themoviedb.org/3/movie/629542/images?api_key=453647fe51ddb15dbe812a48a21b448b&language=en-US")
//         .then(r => { return r.json() })
//         .then(r => console.log(r))
// }
// get()
const instance = basicLightbox.create(`
    <div class="modal">          
        <svg  class="modal__icon">
          <use href="/sprite.2b07476a.svg#icon-close" ></use>
        </svg>      
      <img class="modal__img" src="https://upload.wikimedia.org/wikipedia/ru/thumb/c/c7/Doctor_Strange_poster.jpg/640px-Doctor_Strange_poster.jpg" alt="" />
      <span class=""></span>
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
      <p></p>
      <button type="button">add to watched</button>
      <button type="button">add to queue</button>          
    </div>
`, {
    onShow: (instance) => {
        instance.element().querySelector('svg').onclick = instance.close
    }
})

instance.show()
