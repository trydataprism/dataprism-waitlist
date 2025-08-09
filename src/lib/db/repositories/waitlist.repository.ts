import { eq, sql, count } from "drizzle-orm";
import { db } from "../connection";
import {
  waitlistEntries,
  type WaitlistEntry,
  type NewWaitlistEntry,
} from "../schema";

export class WaitlistRepository {
  async create(data: NewWaitlistEntry): Promise<WaitlistEntry> {
    try {
      const [entry] = await db.insert(waitlistEntries).values(data).returning();

      if (!entry) {
        throw new Error("Failed to create waitlist entry");
      }

      return entry;
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        (("code" in error && error.code === "23505") ||
          ("constraint" in error &&
            error.constraint === "waitlist_entries_email_unique"))
      ) {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<WaitlistEntry | null> {
    try {
      const [entry] = await db
        .select()
        .from(waitlistEntries)
        .where(eq(waitlistEntries.email, email))
        .limit(1);

      return entry || null;
    } catch (error) {
      console.error("Error finding waitlist entry by email:", error);
      throw error;
    }
  }

  async count(): Promise<number> {
    try {
      const [result] = await db
        .select({ count: count() })
        .from(waitlistEntries);

      return result.count;
    } catch (error) {
      console.error("Error counting waitlist entries:", error);
      throw error;
    }
  }

  async countToday(): Promise<number> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [result] = await db
        .select({ count: count() })
        .from(waitlistEntries)
        .where(sql`${waitlistEntries.createdAt} >= ${today}`);

      return result.count;
    } catch (error) {
      console.error("Error counting today's waitlist entries:", error);
      throw error;
    }
  }

  async countThisWeek(): Promise<number> {
    try {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);

      const [result] = await db
        .select({ count: count() })
        .from(waitlistEntries)
        .where(sql`${waitlistEntries.createdAt} >= ${weekAgo}`);

      return result.count;
    } catch (error) {
      console.error("Error counting this week's waitlist entries:", error);
      throw error;
    }
  }

  async exists(email: string): Promise<boolean> {
    try {
      const [result] = await db
        .select({ count: count() })
        .from(waitlistEntries)
        .where(eq(waitlistEntries.email, email));

      return result.count > 0;
    } catch (error) {
      console.error("Error checking if email exists:", error);
      throw error;
    }
  }
}
