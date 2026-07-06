const KEY_SOUND = {
  w: 'sounds/crash.mp3',
  a: 'sounds/kick-bass.mp3',
  s: 'sounds/snare.mp3',
  d: 'sounds/tom-1.mp3',
  j: 'sounds/tom-2.mp3',
  k: 'sounds/tom-3.mp3',
  l: 'sounds/tom-4.mp3',
};
const DRUM_VISUALS = ['images/tom1.png', 'images/tom2.png', 'images/tom3.png', 'images/tom4.png'];

function playKey(key) {
  const src = KEY_SOUND[key];
  if (!src) return;
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.play().catch(() => {});

  const btn = document.querySelector(`.drumkit button[data-key="${key}"]`);
  if (btn) {
    btn.classList.add('playing');
    setTimeout(() => btn.classList.remove('playing'), 120);
  }

  const visual = document.querySelector('#drum-visual');
  if (visual) visual.src = DRUM_VISUALS[Math.floor(Math.random() * DRUM_VISUALS.length)];
}

document.addEventListener('keydown', (e) => playKey(e.key.toLowerCase()));
document.querySelectorAll('.drumkit button').forEach(btn => {
  btn.addEventListener('click', () => playKey(btn.dataset.key));
});
