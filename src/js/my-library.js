const refs = {
    watchedBtn:document.querySelector('[data-btn="watched"]'),
    queueBtn: document.querySelector('[data-btn="queue"]'),
    myLibraryBtn: document.querySelector('[data-btn="myLibrary"]'),
    myLibA: document.querySelector('.library-button'),
    homeBtn: document.querySelector('.home-button'),
    homeA:document.querySelector('[data-a="myLibrary"]'),
    myLibraryBtnContainer:document.querySelector('.buttons__container'),
    inputForm:document.querySelector('.search-form'),
    // gallery:document.querySelector(''),
    
};
// =====
function onClickMyLibraryBtn() {
    if (refs.myLibA.classList.contains('active-page')) {
    return;
    }
    changeClassA('active-page')
    changeClass('on', 'off');
    refs.myLibraryBtnContainer.classList.remove('visually-hidden');
    refs.inputForm.classList.add('visually-hidden')
}

function onClickMyHomeBtn() {
  if (refs.homeBtn.classList.contains('active-page')) {
    return;
  }
  changeClassA('active-page');
  refs.myLibraryBtnContainer.classList.add('visually-hidden');
  refs.inputForm.classList.remove('visually-hidden');
  refs.header.classList.remove('myLib');
  refs.info.innerHTML = '';
}

function myLibrary() {
    refs.myLibraryBtn.addEventListener('click', onClickMyLibraryBtn);
    refs.homeBtn.addEventListener('click', onClickMyHomeBtn);
    refs.watchedBtn.addEventListener('click', onClickWatched);
    refs.queueBtn.addEventListener('click', onClickQueue);
}

function changeClassA(classA) {
  refs.myLibA.classList.toggle(classA);
  refs.homeBtn.classList.toggle(classA);
}

function changeClass(add, remove) {
    refs.watchedBtn.classList.add(add);
    refs.watchedBtn.classList.remove(remove);
    refs.queueBtn.classList.add(remove);
    refs.queueBtn.classList.remove(add);
}

function onClickWatched() {
    changeClass('on', 'off');
    renderWatched();
}

function onClickQueue() {
    changeClass('off', 'on');
    renderQueue();
}

// =====

function renderWatched(newPage) {
    const watched = JSON.parse(window.localStorage.getItem("watched"))
}

function renderQueue(newPage) {
    const queue = JSON.parse(window.localStorage.getItem("queued"))
}

myLibrary();
  


