import './sass/main.scss';
import * as basicLightbox from 'basiclightbox'

export function makeModal() {
    fetch("https://api.themoviedb.org/3/movie/453395?api_key=453647fe51ddb15dbe812a48a21b448b&language=en-US")
        .then(r => { return r.json() })
        .then(r => {
           const markup = `
        <div class="modal">          
        <svg  class="modal__icon">
            <use href="/sprite.2b07476a.svg#icon-close" ></use>
        </svg>      
        <div class="modal__wrapper">
        <img class="modal__img" src="https://image.tmdb.org/t/p/w500${r.poster_path}" alt="" />
        <div class ="modal__data-wrapper">
        <div class="modal__name">${r.title.toUpperCase()}</div>
        <div class="modal__info">
        <ul class="modal__keys">
            <li class="modal__key">Vote / Votes</li>
            <li class="modal__value"><span>${r.vote_average}</span> / <span>${r.vote_count}</span></li>
            <li class="modal__key">Popularity</li>
            <li class="modal__value">${r.popularity}</li>
            <li class="modal__key">Original Title</li>
            <li class="modal__value">${r.original_title}</li>
            <li class="modal__key">Genre</li>
            <li class="modal__value">${r.genres.map(e =>e.name)}</li>
        </ul>
        </div>
        <div>ABOUT</div>
        <p class="modal__descr">${r.overview}</p>      
        <div class="modal__buttons"><div class="modal__button modal__button-watched" >ADD TO WATCHED</div>
        <div class="modal__button modal__button-q">ADD TO QUEUE</button></div> </div>  </div> 
        </div>
        </div>`
            createBox(markup)    
            makeButtonAction()
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
function makeButtonAction() {
    const watched = document.querySelector(".modal__button-watched")    
    const q = document.querySelector(".modal__button-q")
    watched.addEventListener("click", e => {
        console.log()
        if (watched.textContent === "ADD TO WATCHED") {
            watched.textContent = "REMOVE FROM WATCHED"
        }else{
            watched.textContent = "ADD TO WATCHED"
        }    
    })
    q.addEventListener("click", e => {
        console.log()
        if (q.textContent === "ADD TO QUEUE") {
            q.textContent = "REMOVE FROM QUEUE"
        }else{
            q.textContent = "ADD TO QUEUE"
        }    
})
}
makeModal()