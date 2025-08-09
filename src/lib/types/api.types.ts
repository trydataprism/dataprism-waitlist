export interface WaitlistResponse {
  success: boolean;
  count: number;
}

export interface WaitlistCountResponse {
  count: number;
}

export interface ErrorResponse {
  error: string;
}

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
  }
}

export class ValidationError extends APIError {
  constructor(message: string, public field?: string) {
    super(400, message, 'VALIDATION_ERROR');
  }
}

export class ConflictError extends APIError {
  constructor(message: string) {
    super(409, message, 'CONFLICT_ERROR');
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = 'Too many requests. Please try again later.') {
    super(429, message, 'RATE_LIMIT_ERROR');
  }
}

export interface RateLimitResult {
  isLimited: boolean;
  resetTime?: number;
  remainingRequests?: number;
}