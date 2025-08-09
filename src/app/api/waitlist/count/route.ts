import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";

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