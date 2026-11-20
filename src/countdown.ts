import './countdown.css';

const TARGET_TIME = Date.parse('2026-11-24T08:35:00Z');
const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const days = document.querySelector<HTMLElement>('[data-countdown-days]');
const hours = document.querySelector<HTMLElement>('[data-countdown-hours]');
const minutes = document.querySelector<HTMLElement>('[data-countdown-minutes]');
const seconds = document.querySelector<HTMLElement>('[data-countdown-seconds]');
const music = document.querySelector<HTMLAudioElement>('#countdown-music');
const musicToggle = document.querySelector<HTMLButtonElement>('[data-countdown-music-toggle]');
const musicLabel = document.querySelector<HTMLElement>('[data-countdown-music-label]');
const musicStatus = document.querySelector<HTMLElement>('[data-countdown-music-status]');

const toPersianDigits = (value: number) => value
  .toString()
  .padStart(2, '0')
  .replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const render = () => {
  const remaining = Math.max(0, TARGET_TIME - Date.now());
  const dayValue = Math.floor(remaining / DAY);
  const hourValue = Math.floor((remaining % DAY) / HOUR);
  const minuteValue = Math.floor((remaining % HOUR) / MINUTE);
  const secondValue = Math.floor((remaining % MINUTE) / SECOND);

  if (days) days.textContent = toPersianDigits(dayValue);
  if (hours) hours.textContent = toPersianDigits(hourValue);
  if (minutes) minutes.textContent = toPersianDigits(minuteValue);
  if (seconds) seconds.textContent = toPersianDigits(secondValue);

  return remaining;
};

render();
const countdownInterval = window.setInterval(() => {
  if (render() === 0) window.clearInterval(countdownInterval);
}, SECOND);

const renderMusicState = () => {
  if (!music || !musicToggle || !musicLabel) return;
  const playing = !music.paused && !music.ended;
  musicToggle.dataset.playing = String(playing);
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'مکث آهنگ' : 'پخش آهنگ');
  musicLabel.textContent = playing ? 'مکث آهنگ' : 'پخش آهنگ';
};

if (music && musicToggle) {
  music.volume = 0.72;

  music.addEventListener('play', () => {
    if (musicStatus) musicStatus.textContent = 'آهنگ در حال پخش است.';
    renderMusicState();
  });

  music.addEventListener('pause', renderMusicState);
  music.addEventListener('ended', renderMusicState);
  music.addEventListener('error', () => {
    musicToggle.disabled = true;
    if (musicLabel) musicLabel.textContent = 'آهنگ در دسترس نیست';
    if (musicStatus) musicStatus.textContent = 'پخش آهنگ ممکن نیست.';
  });

  const toggleMusic = async () => {
    if (!music.paused && !music.ended) {
      music.pause();
      return;
    }

    try {
      await music.play();
    } catch {
      if (musicStatus) musicStatus.textContent = 'برای پخش آهنگ، دوباره دکمه را لمس کن.';
      renderMusicState();
    }
  };

  musicToggle.addEventListener('click', toggleMusic);
  void music.play().catch(() => renderMusicState());
  renderMusicState();
}
