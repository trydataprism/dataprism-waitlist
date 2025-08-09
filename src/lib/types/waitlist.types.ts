export interface WaitlistStats {
  totalCount: number;
  todayCount: number;
  weeklyCount: number;
}

export interface AddToWaitlistRequest {
  email: string;
}

export interface AddToWaitlistResult {
  entry: {
    id: number;
    email: string;
    createdAt: Date | null;
  };
  totalCount: number;
}