import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const pagePath = join('dist', 'mahya-janam.html');
const page = readFileSync(pagePath, 'utf8');
const redirects = readFileSync(join('dist', '_redirects'), 'utf8');
const audioPath = join('dist', 'audio', 'Arman Garshasbi - Benshin Tamashayat Konam (320).mp3');
const sharePath = join('dist', 'share.jpg');

const required = [
  'وابسته شد',
  'عمری به هر کوی و گذر گشتم که پیدایت کنم',
  'اکنون که پیدا کرده ام بنشین تماشایت کنم',
  'در این جهان بی کران،',
  'خواستنت',
  'تو نیم دیگرم که نه، تمام من تو هستی',
];

for (const text of required) {
  if (!page.includes(text)) throw new Error(`متن الزامی پیدا نشد: ${text}`);
}

const messageBlocks = [...page.matchAll(/<div class="letter__copy" data-personal-message>([\s\S]*?)<\/div>/g)];
const message = messageBlocks
  .map((match) => match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .join(' ');
const wordCount = message.split(/\s+/).filter(Boolean).length;

if (wordCount < 110 || wordCount > 130) {
  throw new Error(`شمار واژه‌های نامه ${wordCount} است؛ باید بین ۱۱۰ تا ۱۳۰ باشد.`);
}

if ((page.match(/<audio\b/g) ?? []).length !== 1) throw new Error('صفحه باید دقیقاً یک عنصر audio داشته باشد.');
if (!page.includes('%28320%29.mp3')) throw new Error('نشانی فایل موسیقی باید پرانتزها را به‌صورت امن کدگذاری کند.');
if (!redirects.split(/\r?\n/).some((line) => /^\/\s+\/mahya-janam\s+302\s*$/.test(line))) {
  throw new Error('ریدایرکت ریشه به /mahya-janam پیدا نشد.');
}
if (statSync(audioPath).size < 9_000_000) throw new Error('فایل موسیقی در خروجی ناقص است.');
if (statSync(sharePath).size < 20_000) throw new Error('تصویر اشتراک‌گذاری صفحه در خروجی ناقص است.');

console.log(`verify: مسیر، موسیقی، تصویر اشتراک‌گذاری، متن‌های الزامی و نامهٔ ${wordCount} واژه‌ای درست‌اند.`);
