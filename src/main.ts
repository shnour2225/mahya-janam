/// <reference types="vite/client" />

import '@fontsource-variable/vazirmatn';
import './style.css';
import './gate.css';
import { matchesTehranCode, normalizeAccessCode } from './access-code';
import { initLetter } from './letter';

declare global {
  interface Window {
    MAHYA_CONFIG?: {
      enableMahyaJanamPage?: boolean;
    };
  }
}

function setupLetterGate() {
  const gate = document.querySelector<HTMLElement>('#letter-gate');
  const template = document.querySelector<HTMLTemplateElement>('#letter-content');
  const form = document.querySelector<HTMLFormElement>('#letter-gate-form');
  const input = document.querySelector<HTMLInputElement>('#letter-code');
  const feedback = document.querySelector<HTMLElement>('#gate-feedback');
  const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!gate || !template || !form || !input || !feedback || !submit) return;

  input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    feedback.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const code = normalizeAccessCode(input.value);
    if (!matchesTehranCode(code)) {
      input.setAttribute('aria-invalid', 'true');
      feedback.textContent = /^\d{4}$/.test(code)
        ? 'این رمز درست نیست یا وقتش گذشته. دوباره امتحان کن.'
        : 'رمز رو با چهار رقم وارد کن.';
      input.focus();
      input.select();
      return;
    }

    const root = document.documentElement;
    root.classList.add('m-enter');
    window.setTimeout(() => root.classList.add('m-enter-done'), 700);
    gate.replaceWith(template.content);
    template.remove();

    // Keep the playback attempt within the visitor's submit gesture.
    initLetter();
    window.scrollTo(0, 0);
    document.querySelector<HTMLElement>('#hero-title')?.focus({ preventScroll: true });

    // Vite serves public modules directly; load them after the letter is in the DOM.
    for (const path of ['assets/motion/motion.js', 'assets/moments/moments.js']) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = `${import.meta.env.BASE_URL}${path}`;
      script.addEventListener('error', () => console.warn('Letter motion did not load:', script.src), { once: true });
      document.head.append(script);
    }
  });

  submit.disabled = false;
}

if (window.MAHYA_CONFIG?.enableMahyaJanamPage === false) {
  document.documentElement.dataset.mahyaPage = 'disabled';
  document.body.replaceChildren();
} else {
  setupLetterGate();
}
