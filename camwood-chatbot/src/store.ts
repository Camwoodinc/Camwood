import fs from 'node:fs';
import path from 'node:path';

export type Chunk = { id: string; url: string; title: string; content: string };

const DATA_DIR = path.join(process.cwd(), 'data');
const CHUNKS_PATH = path.join(DATA_DIR, 'chunks.json');

export function readChunks(): Chunk[] {
  if (!fs.existsSync(CHUNKS_PATH)) return [];
  return JSON.parse(fs.readFileSync(CHUNKS_PATH, 'utf8')) as Chunk[];
}

export function writeChunks(chunks: Chunk[]) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(CHUNKS_PATH, JSON.stringify(chunks, null, 2), 'utf8');
}