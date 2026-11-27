const toPersianDigits = (value: string) => value.replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '—:——';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return toPersianDigits(`${minutes}:${remainder}`);
};

export function initLetter() {
  const audio = document.querySelector<HTMLAudioElement>('#background-music');
  const dock = document.querySelector<HTMLElement>('[data-music-dock]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-music-toggle]');
  if (!audio || !dock || !toggle) return;

  const heroToggle = document.querySelector<HTMLButtonElement>('[data-hero-music]');
  const label = document.querySelector<HTMLElement>('[data-music-label]');
  const status = document.querySelector<HTMLElement>('[data-music-status]');
  const progress = document.querySelector<HTMLElement>('[data-track-progress]');
  const currentTime = document.querySelector<HTMLElement>('[data-current-time]');
  const duration = document.querySelector<HTMLElement>('[data-duration]');
  const hero = document.querySelector<HTMLElement>('#opening');

  const setStatus = (message: string) => {
    if (status) status.textContent = message;
  };

  const renderAudioState = () => {
    const playing = !audio.paused && !audio.ended;
    dock.dataset.playing = String(playing);
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'مکث موسیقی' : 'پخش موسیقی');
    if (label) label.textContent = playing ? 'مکث موسیقی' : dock.dataset.state === 'blocked' ? 'پخش موسیقی' : 'موسیقی';
    if (heroToggle) {
      heroToggle.textContent = playing ? 'مکث موسیقی' : 'پخش آهنگ';
      heroToggle.setAttribute('aria-pressed', String(playing));
    }
  };

  const updateTimeline = () => {
    const ratio = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.currentTime / audio.duration : 0;
    progress?.style.setProperty('--audio-progress', `${Math.min(1, Math.max(0, ratio)) * 100}%`);
    if (currentTime) currentTime.textContent = formatTime(audio.currentTime);
    if (duration) duration.textContent = formatTime(audio.duration);
  };

  const play = async (blockedMessage: string) => {
    try {
      await audio.play();
    } catch {
      if (audio.error) return;
      dock.dataset.state = 'blocked';
      setStatus(blockedMessage);
      renderAudioState();
    }
  };

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

  const togglePlayback = () => {
    if (!audio.paused && !audio.ended) {
      audio.pause();
    } else {
      void play('برای پخش موسیقی دوباره تلاش کن.');
    }
  };

  toggle.addEventListener('click', togglePlayback);
  heroToggle?.addEventListener('click', togglePlayback);

  const source = audio.dataset.src;
  if (source) audio.setAttribute('src', source);
  audio.volume = 0.72;
  void play('برای شنیدن موسیقی، دکمهٔ پخش را لمس کن.');
  renderAudioState();
  updateTimeline();

  if (hero && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      const hidden = entry.isIntersecting && entry.intersectionRatio > 0.22;
      dock.dataset.heroVisible = String(hidden);
      dock.setAttribute('aria-hidden', String(hidden));
      dock.toggleAttribute('inert', hidden);
    }, { threshold: [0, 0.22, 0.5] });
    heroObserver.observe(hero);
  }
}
