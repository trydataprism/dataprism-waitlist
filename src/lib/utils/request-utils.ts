import { NextRequest } from "next/server";

/**
 * Extracts the real IP address from request headers
 * Handles common proxy headers like X-Forwarded-For and X-Real-IP
 */
export function getRealIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const real = req.headers.get("x-real-ip");
  
  if (forwarded) {
    // X-Forwarded-For can contain multiple IPs, use the first one
    return forwarded.split(",")[0].trim();
  }
  
  if (real) {
    return real.trim();
  }
  
  // Fallback to localhost if no headers found (development)
  return "127.0.0.1";
}

/**
 * Creates a structured error log entry
 */
export function createErrorLog(error: unknown, context: Record<string, unknown> = {}) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  
  return {
    message: errorMessage,
    stack: errorStack,
    timestamp: new Date().toISOString(),
    ...context,
  };
}