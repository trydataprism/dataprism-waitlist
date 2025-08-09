import { NextRequest, NextResponse } from "next/server";
import { WaitlistService } from "@/lib/services/waitlist.service";
import { rateLimiter } from "@/lib/middleware/rate-limiter";
import { getRealIP, createErrorLog } from "@/lib/utils/request-utils";
import {
  APIError,
  ValidationError,
  ConflictError,
  RateLimitError,
  type WaitlistResponse,
  type ErrorResponse,
} from "@/lib/types/api.types";

export async function POST(req: NextRequest) {
  const waitlistService = new WaitlistService();
  
  try {
    const ip = getRealIP(req);
    
    // Check rate limit
    await rateLimiter.enforceRateLimit(ip);

    // Get request body
    const body = await req.json();
    
    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" } as ErrorResponse,
        { status: 400 }
      );
    }
    
    // Add to waitlist using service layer
    const result = await waitlistService.addToWaitlist(body.email);
    
    const response: WaitlistResponse = {
      success: true,
      count: result.totalCount,
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/waitlist error:", createErrorLog(error, {
      ip: getRealIP(req),
      userAgent: req.headers.get("user-agent"),
    }));
    
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: error.message } as ErrorResponse,
        { status: error.statusCode }
      );
    }
    
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message } as ErrorResponse,
        { status: error.statusCode }
      );
    }
    
    if (error instanceof ConflictError) {
      return NextResponse.json(
        { error: error.message } as ErrorResponse,
        { status: error.statusCode }
      );
    }
    
    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message } as ErrorResponse,
        { status: error.statusCode }
      );
    }
    
    // Generic server error
    return NextResponse.json(
      { error: "Internal server error" } as ErrorResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  const waitlistService = new WaitlistService();
  
  try {
    const count = await waitlistService.getWaitlistCount();
    
    return NextResponse.json({ count }, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/waitlist error:", createErrorLog(error));
    
    return NextResponse.json(
      { error: "Failed to get waitlist count" } as ErrorResponse,
      { status: 500 }
    );
  }
}