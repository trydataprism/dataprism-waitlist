import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { DATABASE_CONFIG } from '../config/rate-limit.config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: DATABASE_CONFIG.maxConnections,
  idleTimeoutMillis: DATABASE_CONFIG.idleTimeout,
  connectionTimeoutMillis: DATABASE_CONFIG.connectionTimeout,
  maxUses: DATABASE_CONFIG.maxUses,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const db = drizzle(pool, { schema });

export type Database = typeof db;