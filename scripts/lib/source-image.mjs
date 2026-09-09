import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export function selectSourceImages(html, url) {
  const output = execFileSync('python3', [fileURLToPath(new URL('./source_image.py', import.meta.url))], {
    input: JSON.stringify({ html, url }), maxBuffer: 20 * 1024 * 1024,
  });
  return JSON.parse(output.toString('utf8'));
}

export function selectSourceImage(html, url) {
  const result=selectSourceImages(html, url);
  const candidate=result.candidates[0];
  return candidate ? { ...candidate, title:result.title, description:result.description } : null;
}

export function imageContentType(bytes, declared = '') {
  const type = declared.split(';')[0].trim().toLowerCase();
  if (type !== 'application/octet-stream' && !type.startsWith('image/')) return null;
  if (bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'image/png';
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if (bytes.subarray(0,4).toString() === 'RIFF' && bytes.subarray(8,12).toString() === 'WEBP') return 'image/webp';
  if (/^GIF8[79]a/.test(bytes.subarray(0,6).toString())) return 'image/gif';
  if (bytes.subarray(4,8).toString() === 'ftyp' && /avif|avis/.test(bytes.subarray(8,32).toString())) return 'image/avif';
  if (type === 'image/svg+xml' && /<svg[\s>]/i.test(bytes.subarray(0,1000).toString())) return type;
  return null;
}
