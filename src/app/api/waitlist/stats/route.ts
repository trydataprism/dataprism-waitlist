import { NextResponse } from "next/server";
import { WaitlistService } from "@/lib/services/waitlist.service";
import { createErrorLog } from "@/lib/utils/request-utils";
import { type ErrorResponse } from "@/lib/types/api.types";

export async function GET() {
  const waitlistService = new WaitlistService();

  try {
    const stats = await waitlistService.getWaitlistStats();

    return NextResponse.json(stats, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/waitlist/stats error:", createErrorLog(error));

    return NextResponse.json(
      { error: "Failed to get waitlist statistics" } as ErrorResponse,
      { status: 500 }
    );
  }
}
