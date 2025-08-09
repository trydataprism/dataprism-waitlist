export const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  maxRequests: 2, // Maximum requests per window per IP
  cleanupIntervalMs: 5 * 60 * 1000, // Clean up expired entries every 5 minutes
} as const;

export const DATABASE_CONFIG = {
  connectionTimeout: 2000, // 2 seconds
  idleTimeout: 30000, // 30 seconds
  maxConnections: 20,
  maxUses: 7500, // Close connections after 7500 queries
} as const;