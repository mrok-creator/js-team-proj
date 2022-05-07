import './sass/main.scss';
import * as basicLightbox from 'basiclightbox'

export function makeFilmModal(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=453647fe51ddb15dbe812a48a21b448b&language=en-US`)
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
            makeButtonAction(id)
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
function makeButtonAction(id) {
    const watched = document.querySelector(".modal__button-watched")
    const q = document.querySelector(".modal__button-q")
    let watchList = JSON.parse(localStorage.getItem("watched"))     
        if (!watchList) {
                watchList = []
    }
    
    
    if (watchList.includes(id)) {        
            watched.classList.add("butttonActiveState");
            watched.textContent = "REMOVE FROM WATCHED"
    }
    
    watched.addEventListener("click", () => {
        watched.classList.toggle("butttonActiveState")
        if (watched.textContent === "ADD TO WATCHED") {     
            watchList.push(id)
            localStorage.setItem(`watched`, JSON.stringify(watchList))
            watched.textContent = "REMOVE FROM WATCHED"
        } else {
            watchList.splice(watchList.indexOf(id),1)
            localStorage.setItem("watched",JSON.stringify(watchList))
            watched.textContent = "ADD TO WATCHED"
        }
    })    
    let queueList = JSON.parse(localStorage.getItem("queued"))     
        if (!queueList) {
                queueList = []
    }
    
    
    if (queueList.includes(id)) {        
            q.classList.add("butttonActiveState");
            q.textContent = "REMOVE FROM QUEUE"
    }
    
    q.addEventListener("click", () => {
        q.classList.toggle("butttonActiveState")
        if (q.textContent === "ADD TO QUEUE") {     
            queueList.push(id)
            localStorage.setItem(`queued`, JSON.stringify(queueList))
            q.textContent = "REMOVE FROM QUEUE"
        } else {
            queueList.splice(queueList.indexOf(id),1)
            localStorage.setItem("queued",JSON.stringify(queueList))
            q.textContent = "ADD TO QUEUE"
        }
    }) 
}
