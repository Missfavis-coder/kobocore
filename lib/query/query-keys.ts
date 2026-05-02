import type { TransactionType } from "../types/dashboard";

export const queryKeys = {
  auth: {
    profile: ["auth", "profile"] as const,
  },

  system: {
    health: ["system", "health"] as const,
  },

  wallet: {
    get: () => ["wallet"] as const,

    transactions: (params?: {
      page?: number;
      limit?: number;
      type?: TransactionType;
      from?: string;
      to?: string;
    }) => ["wallet", "transactions", params] as const,
  },

  funding: {
    get: (id: string) => ["funding", id] as const,
  },

  transfers: {
    list: () => ["transfers"] as const,
    get: (id: string) => ["transfers", id] as const,
  },

  disputes: {
    get: (id: string) => ["disputes", id] as const,
  },

  apiKeys: {
    list: () => ["apiKeys"] as const,
  },
} as const;