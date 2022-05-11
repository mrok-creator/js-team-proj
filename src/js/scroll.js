export { onScroll, onUpBtnClick };

const upBtn = document.querySelector('.scroll-btn');

window.addEventListener('scroll', onScroll);
upBtn.addEventListener('click', onUpBtnClick);

function onScroll() {
  const scrolled = window.scrollY;
  const height = 300;

  if (scrolled < height) {
    upBtn.classList.add('visually-hidden');
  }
  if (scrolled > height) {
    upBtn.classList.remove('visually-hidden');
  }
}

function onUpBtnClick() {
  if (window.scrollY > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
