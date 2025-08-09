import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const emailSchema = z.object({
  email: z.string().email(),
});

const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 2;

function getRealIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const real = req.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (real) {
    return real.trim();
  }
  
  return "127.0.0.1";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getRealIP(req);
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validatedData = emailSchema.parse(body);
    
    const existingEntry = await db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.email, validatedData.email))
      .limit(1);
    
    if (existingEntry.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }
    
    await db.insert(waitlistEntries).values({
      email: validatedData.email,
    });
    
    const totalCount = await db.select().from(waitlistEntries);
    
    return NextResponse.json({
      success: true,
      count: totalCount.length,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const totalCount = await db.select().from(waitlistEntries);
    return NextResponse.json({ count: totalCount.length });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}