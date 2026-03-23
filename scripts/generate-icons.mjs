import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = resolve(__dirname, '../public');

const iconSvg = `
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#22c55e"/><stop offset="100%" stop-color="#15803d"/>
  </linearGradient></defs>
  <rect width="512" height="512" rx="110" fill="url(#bg)"/>
  <text x="256" y="320" font-family="system-ui" font-size="280" font-weight="800" fill="white" text-anchor="middle">S</text>
</svg>`;

const ogSvg = `
<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#14532d"/>
  <rect x="60" y="60" width="100" height="100" rx="22" fill="#22c55e"/>
  <text x="110" y="135" font-family="system-ui" font-size="60" font-weight="800" fill="white" text-anchor="middle">S</text>
  <text x="200" y="130" font-family="system-ui" font-size="44" font-weight="700" fill="white">serviciile<tspan fill="#86efac">.ro</tspan></text>
  <text x="60" y="350" font-family="system-ui" font-size="52" font-weight="700" fill="white">Cum alegi servicii</text>
  <text x="60" y="420" font-family="system-ui" font-size="52" font-weight="700" fill="#86efac">de calitate</text>
  <text x="60" y="520" font-family="system-ui" font-size="24" fill="#a7f3d0">60 tipuri de servicii · 35 orașe · Sfaturi practice</text>
</svg>`;

async function gen() {
  const i = Buffer.from(iconSvg), o = Buffer.from(ogSvg);
  await sharp(i).resize(32,32).png().toFile(resolve(pub,'favicon-32.png'));
  await sharp(i).resize(180,180).png().toFile(resolve(pub,'apple-touch-icon.png'));
  await sharp(i).resize(192,192).png().toFile(resolve(pub,'icon-192.png'));
  await sharp(i).resize(512,512).png().toFile(resolve(pub,'icon-512.png'));
  await sharp(o).resize(1200,630).png().toFile(resolve(pub,'og-default.png'));
  console.log('Done!');
}
gen();
