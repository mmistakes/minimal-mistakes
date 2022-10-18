const moreBtn = document.querySelector('.upNextandInfo .info .metadata .moreBtn');

const title = document.querySelector('.upNextandInfo .info .metadata .titleAndButton .title');


moreBtn.addEventListener('click', () => {
  moreBtn.classList.toggle('clicked');
  title.classList.toggle('clamp');
});
