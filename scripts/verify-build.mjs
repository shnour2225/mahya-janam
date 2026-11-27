import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const pagePath = join('dist', 'mahya-janam.html');
const page = readFileSync(pagePath, 'utf8');
const countdownPage = readFileSync(join('dist', 'seconds-until-seeing-you', 'index.html'), 'utf8');
const siteConfig = readFileSync(join('dist', 'site-config.js'), 'utf8');
const audioPath = join('dist', 'audio', 'Arman Garshasbi - Benshin Tamashayat Konam (320).mp3');
const sharePath = join('dist', 'share.jpg');
const template = page.match(/<template id="letter-content">([\s\S]*?)<\/template>/);

if (!template || !page.includes('id="letter-gate-form"')) throw new Error('صفحهٔ رمز یا محتوای نامه پیدا نشد.');
const [inertMarkup, letter] = template;
const gate = page.replace(inertMarkup, '');
if (!/<input\b[^>]*id="letter-code"[^>]*maxlength="4"/.test(gate)) {
  throw new Error('صفحهٔ رمز باید ورودی چهاررقمی داشته باشد.');
}
if (/<(?:img|audio|video)\b/i.test(gate)) {
  throw new Error('تصاویر و موسیقی نباید پیش از ورود رمز بارگذاری شوند.');
}

const required = [
  'وابسته شد',
  'عمری به هر کوی و گذر گشتم که پیدایت کنم',
  'اکنون که پیدا کرده ام بنشین تماشایت کنم',
  'در این جهان بی کران،',
  'خواستنت',
  'تو نیم دیگرم که نه، تمام من تو هستی',
];

for (const text of required) {
  if (!letter.includes(text)) throw new Error(`متن الزامی پیدا نشد: ${text}`);
  if (gate.includes(text)) throw new Error('متن نامه نباید پیش از ورود رمز نمایش داده شود.');
}

const messageBlocks = [...letter.matchAll(/<div class="letter__copy" data-personal-message>([\s\S]*?)<\/div>/g)];
const message = messageBlocks
  .map((match) => match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .join(' ');
const wordCount = message.split(/\s+/).filter(Boolean).length;

if (wordCount < 110 || wordCount > 130) {
  throw new Error(`شمار واژه‌های نامه ${wordCount} است؛ باید بین ۱۱۰ تا ۱۳۰ باشد.`);
}

if ((letter.match(/<audio\b/g) ?? []).length !== 1) throw new Error('صفحه باید دقیقاً یک عنصر audio داشته باشد.');
if (!letter.includes('%28320%29.mp3')) throw new Error('نشانی فایل موسیقی باید پرانتزها را به‌صورت امن کدگذاری کند.');
if (!siteConfig.includes('enableMahyaJanamPage')) throw new Error('تنظیم نمایش صفحهٔ اصلی پیدا نشد.');
if (!countdownPage.includes('2026-11-24T12:05:00+03:30')) throw new Error('زمان دیدار در صفحهٔ شمارش معکوس درست نیست.');
if (statSync(audioPath).size < 9_000_000) throw new Error('فایل موسیقی در خروجی ناقص است.');
if (statSync(sharePath).size < 20_000) throw new Error('تصویر اشتراک‌گذاری صفحه در خروجی ناقص است.');

console.log(`verify: صفحهٔ رمز، صفحهٔ شمارش معکوس، تنظیم نمایش، موسیقی و نامهٔ ${wordCount} واژه‌ای درست‌اند.`);
