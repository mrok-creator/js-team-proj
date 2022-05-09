import * as basicLightbox from 'basiclightbox'
import { getFilmDescription } from './service/api'
import { makeModalMarkup } from './markup'
export function makeFilmModal(id) {
    getFilmDescription(id)
        .then(r => {
            createBox(makeModalMarkup(r))
            makeButtonAction(id)
        })
}

function createBox(markup) {
    const instance = basicLightbox.create(markup, {
        onShow: (instance) => {
            window.addEventListener("keydown", (e) => {
                if (e.keyCode == 27) {
                    instance.close()
                }
            })
            instance.element().querySelector('svg').onclick = instance.close
        }
    })
    instance.show()
}
function makeButtonAction(id) {
    const trailer = document.querySelector(".modal__button--trailer")
    const watched = document.querySelector(".modal__button--watched")
    const q = document.querySelector(".modal__button--q")
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
        if (!watchList.includes(id)) {
            watchList.push(id)
            localStorage.setItem(`watched`, JSON.stringify(watchList))
            watched.textContent = "REMOVE FROM WATCHED"
        } else {
            watchList.splice(watchList.indexOf(id), 1)
            localStorage.setItem("watched", JSON.stringify(watchList))
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
        if (!queueList.includes(id)) {
            queueList.push(id)
            localStorage.setItem(`queued`, JSON.stringify(queueList))
            q.textContent = "REMOVE FROM QUEUE"
        } else {
            queueList.splice(queueList.indexOf(id), 1)
            localStorage.setItem("queued", JSON.stringify(queueList))
            q.textContent = "ADD TO QUEUE"
        }
    })

    trailer.addEventListener("click", () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}}/videos?api_key=453647fe51ddb15dbe812a48a21b448b&language=en-US`)
            .then(r => r.json())
            .then(r => {
                if (r.results.length === 0) {
                    const instance2 = basicLightbox.create(`<div class="sorry-text">а де?</div>`)
                    instance2.show()
                } else {
                    const instance2 = basicLightbox.create(`
                <iframe src="https://www.youtube.com/embed/${r.results[0].key}" width="560" height="315"  frameborder="0"></iframe>`)
                    instance2.show()
                }
            })
    })
}