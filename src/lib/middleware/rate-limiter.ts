import { RATE_LIMIT_CONFIG } from "../config/rate-limit.config";
import { RateLimitResult, RateLimitError } from "../types/api.types";

interface RequestRecord {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private requests = new Map<string, RequestRecord>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries periodically to prevent memory leaks
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, RATE_LIMIT_CONFIG.cleanupIntervalMs);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  checkRateLimit(identifier: string): RateLimitResult {
    const now = Date.now();
    const record = this.requests.get(identifier);
    
    // If no record exists or window has expired, create new record
    if (!record || now > record.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + RATE_LIMIT_CONFIG.windowMs,
      });
      
      return {
        isLimited: false,
        resetTime: now + RATE_LIMIT_CONFIG.windowMs,
        remainingRequests: RATE_LIMIT_CONFIG.maxRequests - 1,
      };
    }
    
    // Check if rate limit exceeded
    if (record.count >= RATE_LIMIT_CONFIG.maxRequests) {
      return {
        isLimited: true,
        resetTime: record.resetTime,
        remainingRequests: 0,
      };
    }
    
    // Increment request count
    record.count++;
    
    return {
      isLimited: false,
      resetTime: record.resetTime,
      remainingRequests: RATE_LIMIT_CONFIG.maxRequests - record.count,
    };
  }

  async enforceRateLimit(identifier: string): Promise<void> {
    const result = this.checkRateLimit(identifier);
    
    if (result.isLimited) {
      throw new RateLimitError();
    }
  }

  // Graceful shutdown
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.requests.clear();
  }
}

// Singleton instance to maintain state across requests
export const rateLimiter = new RateLimiter();