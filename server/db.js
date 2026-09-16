import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;

function env(name, fallback = '') {
  const raw = process.env[name];
  if (raw == null || raw === '') return fallback;
  return raw.trim().replace(/^["']|["']$/g, '');
}

export const pool = new Pool({
  host: env('DATABASE_HOST', '127.0.0.1'),
  port: Number(env('DATABASE_PORT', '5432')),
  user: env('DATABASE_USER', 'postgres'),
  password: env('DATABASE_PASSWORD'),
  database: env('DATABASE_NAME', 'site_anhanguera'),
  ssl: env('DATABASE_SSL') === 'require' ? { rejectUnauthorized: false } : false,
  max: 10,
  connectionTimeoutMillis: 15000,
});
