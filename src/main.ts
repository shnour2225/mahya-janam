import '@fontsource-variable/vazirmatn';
import './style.css';

declare global {
  interface Window {
    MAHYA_CONFIG?: {
      enableMahyaJanamPage?: boolean;
    };
  }
}

const mahyaJanamPageEnabled = window.MAHYA_CONFIG?.enableMahyaJanamPage !== false;

if (!mahyaJanamPageEnabled) {
  document.documentElement.dataset.mahyaPage = 'disabled';
  document.body.replaceChildren();
}

const audio = mahyaJanamPageEnabled ? document.querySelector<HTMLAudioElement>('#background-music') : null;
const dock = mahyaJanamPageEnabled ? document.querySelector<HTMLElement>('[data-music-dock]') : null;
const toggle = mahyaJanamPageEnabled ? document.querySelector<HTMLButtonElement>('[data-music-toggle]') : null;
const heroToggle = mahyaJanamPageEnabled ? document.querySelector<HTMLButtonElement>('[data-hero-music]') : null;
const label = mahyaJanamPageEnabled ? document.querySelector<HTMLElement>('[data-music-label]') : null;
const status = mahyaJanamPageEnabled ? document.querySelector<HTMLElement>('[data-music-status]') : null;
const progress = mahyaJanamPageEnabled ? document.querySelector<HTMLElement>('[data-track-progress]') : null;
const currentTime = mahyaJanamPageEnabled ? document.querySelector<HTMLElement>('[data-current-time]') : null;
const duration = mahyaJanamPageEnabled ? document.querySelector<HTMLElement>('[data-duration]') : null;
const hero = mahyaJanamPageEnabled ? document.querySelector<HTMLElement>('#opening') : null;

const toPersianDigits = (value: string) => value.replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '—:——';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return toPersianDigits(`${minutes}:${remainder}`);
};

const setStatus = (message: string) => {
  if (status) status.textContent = message;
};

const renderAudioState = () => {
  if (!audio || !dock || !toggle || !label) return;
  const playing = !audio.paused && !audio.ended;
  dock.dataset.playing = String(playing);
  toggle.setAttribute('aria-pressed', String(playing));
  toggle.setAttribute('aria-label', playing ? 'مکث موسیقی' : 'پخش موسیقی');
  label.textContent = playing ? 'مکث موسیقی' : dock.dataset.state === 'blocked' ? 'پخش موسیقی' : 'موسیقی';
  if (heroToggle) {
    heroToggle.textContent = playing ? 'مکث موسیقی' : 'پخش آهنگ';
    heroToggle.setAttribute('aria-pressed', String(playing));
  }
};

const updateTimeline = () => {
  if (!audio) return;
  const ratio = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.currentTime / audio.duration : 0;
  progress?.style.setProperty('--audio-progress', `${Math.min(1, Math.max(0, ratio)) * 100}%`);
  if (currentTime) currentTime.textContent = formatTime(audio.currentTime);
  if (duration) duration.textContent = formatTime(audio.duration);
};

if (audio && dock && toggle) {
  const source = audio.dataset.src;
  if (source) audio.setAttribute('src', source);
  audio.volume = 0.72;

  audio.addEventListener('loadedmetadata', updateTimeline);
  audio.addEventListener('durationchange', updateTimeline);
  audio.addEventListener('timeupdate', updateTimeline);
  audio.addEventListener('play', () => {
    dock.dataset.state = 'ready';
    setStatus('موسیقی در حال پخش است.');
    renderAudioState();
  });
  audio.addEventListener('pause', () => {
    if (!audio.ended) setStatus('موسیقی مکث شد.');
    renderAudioState();
  });
  audio.addEventListener('ended', () => {
    dock.dataset.state = 'ended';
    setStatus('موسیقی به پایان رسید.');
    renderAudioState();
    updateTimeline();
  });
  audio.addEventListener('error', () => {
    dock.dataset.state = 'error';
    toggle.disabled = true;
    if (heroToggle) heroToggle.disabled = true;
    if (label) label.textContent = 'موسیقی در دسترس نیست';
    setStatus('پخش موسیقی ممکن نیست.');
  });

  const togglePlayback = async () => {
    if (!audio.paused && !audio.ended) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      dock.dataset.state = 'blocked';
      setStatus('برای پخش موسیقی دوباره تلاش کن.');
      renderAudioState();
    }
  };

  toggle.addEventListener('click', togglePlayback);
  heroToggle?.addEventListener('click', togglePlayback);

  // Exactly one audible autoplay attempt. A rejected promise only reveals the explicit one-tap action.
  void audio.play().then(() => {
    dock.dataset.state = 'ready';
    renderAudioState();
  }).catch(() => {
    dock.dataset.state = 'blocked';
    setStatus('برای شنیدن موسیقی، دکمهٔ پخش را لمس کن.');
    renderAudioState();
  });

  renderAudioState();
  updateTimeline();
}

if (hero && dock && 'IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    const hidden = entry.isIntersecting && entry.intersectionRatio > 0.22;
    dock.dataset.heroVisible = String(hidden);
    dock.setAttribute('aria-hidden', String(hidden));
    dock.toggleAttribute('inert', hidden);
  }, { threshold: [0, 0.22, 0.5] });
  heroObserver.observe(hero);
}
