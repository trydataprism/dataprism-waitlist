import { WaitlistRepository } from "../db/repositories/waitlist.repository";
import {
  validateEmail,
  type ValidatedEmailInput,
} from "../validators/waitlist.validators";
import { ConflictError, ValidationError } from "../types/api.types";
import {
  type AddToWaitlistResult,
  type WaitlistStats,
} from "../types/waitlist.types";
import { createErrorLog } from "../utils/request-utils";

export class WaitlistService {
  private repository: WaitlistRepository;

  constructor() {
    this.repository = new WaitlistRepository();
  }

  async addToWaitlist(email: string): Promise<AddToWaitlistResult> {
    try {
      // Validate email input
      const validatedData: ValidatedEmailInput = validateEmail({ email });

      // Check if email already exists
      const exists = await this.repository.exists(validatedData.email);
      if (exists) {
        throw new ConflictError("Email already registered");
      }

      // Create new waitlist entry
      const entry = await this.repository.create({
        email: validatedData.email,
      });

      // Get updated count
      const totalCount = await this.repository.count();

      return {
        entry: {
          id: entry.id,
          email: entry.email,
          createdAt: entry.createdAt,
        },
        totalCount,
      };
    } catch (error: unknown) {
      if (error instanceof ConflictError || error instanceof ValidationError) {
        throw error;
      }

      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string" &&
        (error as { message: string }).message === "EMAIL_ALREADY_EXISTS"
      ) {
        throw new ConflictError("Email already registered");
      }

      // Log unexpected errors
      console.error(
        "Waitlist service error:",
        createErrorLog(error, { email })
      );
      throw new Error("Failed to add email to waitlist");
    }
  }

  async getWaitlistCount(): Promise<number> {
    try {
      return await this.repository.count();
    } catch (error: unknown) {
      console.error("Error getting waitlist count:", createErrorLog(error));
      throw new Error("Failed to get waitlist count");
    }
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    try {
      const validatedData = validateEmail({ email });
      return await this.repository.exists(validatedData.email);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        return false; // Invalid email doesn't exist
      }

      console.error(
        "Error checking email existence:",
        createErrorLog(error, { email })
      );
      throw new Error("Failed to check email existence");
    }
  }

  async getWaitlistStats(): Promise<WaitlistStats> {
    try {
      const [totalCount, todayCount, weeklyCount] = await Promise.all([
        this.repository.count(),
        this.repository.countToday(),
        this.repository.countThisWeek(),
      ]);

      return {
        totalCount,
        todayCount,
        weeklyCount,
      };
    } catch (error: unknown) {
      console.error("Error getting waitlist stats:", createErrorLog(error));
      throw new Error("Failed to get waitlist statistics");
    }
  }
}
