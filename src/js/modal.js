import * as basicLightbox from 'basiclightbox'
import { getFilmDescription } from './service/api'
import { makeModalMarkup } from './markup'
import { getFromFirebase, removeFromFirebase } from './service/firebase-api'
import { pushData } from './service/firebase-api'
import { getDatabase, ref, push, onValue, get, key } from 'firebase/database';
const ul = document.querySelector(".list_films")
ul.addEventListener("click", (e) => {
    e.preventDefault()
    let b = e.target.parentNode.parentNode

    if (b.nodeName == "LI") {

        makeFilmModal(b.id)
    }

})
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
async function makeButtonAction(id) {

    const trailer = document.querySelector(".modal__button--trailer")
    const watched = document.querySelector(".modal__button--watched")
    const q = document.querySelector(".modal__button--q")
    const userId = localStorage.getItem('userId');
    if (userId) {
        q.style.display = "flex"
        watched.style.display = "flex"
    }
    let watchList = await getFromFirebase("watched")
    if (!watchList || !watchList.includes(id)) {
        watched.textContent = "ADD TO WATCHED"
    } else {
        watched.classList.add("butttonActiveState");
        watched.textContent = "REMOVE FROM WATCHED"
    }
    watched.addEventListener("click", () => {
        watched.classList.toggle("butttonActiveState")
        if (!watchList || !watchList.includes(id)) {
            pushData(id, "watched")
            watched.textContent = "REMOVE FROM WATCHED"
        } else {
            watchList.splice(watchList.indexOf(id), 1)
            removeFromFirebase("watched")
            watchList.forEach(e => {
                pushData(e, "watched")
            });
            watched.textContent = "ADD TO WATCHED"
        }
    })

    let queueList = await getFromFirebase("queued")
    if (!queueList || !queueList.includes(id)) {
        q.textContent = "ADD TO QUEUE"
    } else {
        q.classList.add("butttonActiveState");
        q.textContent = "REMOVE FROM QUEUE"

    }

    q.addEventListener("click", () => {
        q.classList.toggle("butttonActiveState")
        if (!queueList || !queueList.includes(id)) {
            pushData(id, "queued")
            q.textContent = "REMOVE FROM  QUEUE"
        } else {
            queueList.splice(queueList.indexOf(id), 1)
            removeFromFirebase("queued")
            queueList.forEach(e => {
                pushData(e, "queued")
            });
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