// Genera los íconos PNG de la app (cuadrado verde con la línea de pulso) en public/.
// Uso: node scripts/iconos.mjs
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const VERDE = [0x12, 0x69, 0x5f], BLANCO = [255, 255, 255];
const LINEA = [[12, 33], [21, 33], [26, 21], [35, 45], [40, 33], [52, 33]]; // en un lienzo de 64 x 64

function distSeg(px, py, [ax, ay], [bx, by]){
  const dx = bx - ax, dy = by - ay, t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
// Cobertura (0 a 1) del cuadrado redondeado en un punto, con borde suavizado
function enCuadrado(x, y, size, r){
  const cx = Math.min(Math.max(x, r), size - r), cy = Math.min(Math.max(y, r), size - r);
  return Math.max(0, Math.min(1, r - Math.hypot(x - cx, y - cy) + 0.5));
}
function icono(size, completo){
  const k = completo ? 0.7 : 1, s = size / 64 * k, o = size * (1 - k) / 2, ancho = 4.5 * s, radio = 14 * size / 64;
  const pts = LINEA.map(([a, b]) => [o + a * s, o + b * s]);
  const px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++){
    const cxp = x + 0.5, cyp = y + 0.5;
    const fondo = completo ? 1 : enCuadrado(cxp, cyp, size, radio);
    let d = Infinity; for (let i = 0; i < pts.length - 1; i++) d = Math.min(d, distSeg(cxp, cyp, pts[i], pts[i + 1]));
    const linea = Math.max(0, Math.min(1, ancho / 2 - d + 0.5));
    const i = (y * size + x) * 4;
    for (let c = 0; c < 3; c++) px[i + c] = Math.round(VERDE[c] * (1 - linea) + BLANCO[c] * linea);
    px[i + 3] = Math.round(255 * Math.max(fondo, linea * fondo));
  }
  return png(size, size, px);
}
const CRC = new Uint32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = buf => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function trozo(tipo, datos){
  const t = Buffer.from(tipo), largo = Buffer.alloc(4), crc = Buffer.alloc(4);
  largo.writeUInt32BE(datos.length); crc.writeUInt32BE(crc32(Buffer.concat([t, datos])));
  return Buffer.concat([largo, t, datos, crc]);
}
function png(w, h, rgba){
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const filas = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) rgba.copy(filas, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), trozo('IHDR', ihdr), trozo('IDAT', deflateSync(filas)), trozo('IEND', Buffer.alloc(0))]);
}

const salida = new URL('../public/', import.meta.url);
writeFileSync(new URL('icon-192.png', salida), icono(192, false));
writeFileSync(new URL('icon-512.png', salida), icono(512, false));
writeFileSync(new URL('icon-maskable-512.png', salida), icono(512, true));
writeFileSync(new URL('apple-touch-icon.png', salida), icono(180, true));
console.log('Íconos creados en public/');
