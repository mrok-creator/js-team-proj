import * as basicLightbox from 'basiclightbox'

const instance = basicLightbox.create(`
    <div class="modal">
        <p>A custom modal that has been styled independently. It's not part of basicLightbox, but perfectly shows its flexibility.</p>
        <input placeholder="Type something">
        <a>Close</a>
    </div>
`, {
    onShow: (instance) => {
        instance.element().querySelector('a').onclick = instance.close
    }
})

instance.show()