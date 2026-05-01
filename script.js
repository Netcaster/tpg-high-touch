const coin = document.getElementById('coin');
let flipped = false;

coin.addEventListener('click', () => {
  flipped = !flipped;
  coin.classList.toggle('flipped', flipped);
});

coin.addEventListener('dblclick', () => {
  window.location.href = flipped ? 'index.html#mission' : 'high-tech.html';
});
