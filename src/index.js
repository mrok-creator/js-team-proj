import './sass/main.scss';
import * as basicLightbox from 'basiclightbox'

function get() {
    fetch("https://api.themoviedb.org/3/movie/566574?api_key=453647fe51ddb15dbe812a48a21b448b&language=en-US")
        .then(r => { return r.json() })
        .then(r => {
           const markup = `
    <div class="modal">          
        <svg  class="modal__icon">
          <use href="/sprite.2b07476a.svg#icon-close" ></use>
        </svg>      
      <div class="modal__wrapper">
      <img class="modal__img" src="https://image.tmdb.org/t/p/w500${r.poster_path}" alt="" />
      <div class="modal__name">${r.title.toUpperCase()}</div>
      <div class="modal__info">
        <ul class="modal__keys">
          <li class="modal__key">Vote / Votes</li>
          <li class="modal__key">Popularity</li>
          <li class="modal__key">Original Title</li>
          <li class="modal__key">Genre</li>
        </ul>
        <ul class="modal__values">
          <li class="modal__values"><span>${r.vote_average}</span> / ${r.vote_count}</li>
          <li class="modal__values">${r.popularity}</li>
          <li class="modal__values">${r.original_title}</li>
          <li class="modal__values">${r.genres.map(e =>e.name)}</li>
        </ul>
      </div>
      <div>ABOUT</div>
      <p class="modal__descr">${r.overview}</p>      
      <div class="modal__buttons"><button class="modal__button modal__button-watched" type="button">ADD TO WATCHED</button>
      <button class="modal__button modal__button-q"type="button">ADD TO QUEUE</button></button> </div>   
    </div>
`
            createBox(markup)
            console.log(r)            
        })
}

function createBox(markup) {
    const instance = basicLightbox.create(markup, {
    onShow: (instance) => {
        instance.element().querySelector('svg').onclick = instance.close
    }
})
    instance.show()
}

get()
