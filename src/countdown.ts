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
