  interface Transaction {
    id: string;
    reference: string;
    type: "CREDIT" | "DEBIT";
    amount: number;
    status: "SUCCESS" | "PENDING" | "FAILED";
    description: string;
    createdAt: string;
  }
  export const transactions: Transaction[] = [
    {
      id: "txn_109283",
      reference: "KBC-DEP-001",
      type: "CREDIT",
      amount: 5000000,
      status: "SUCCESS",
      description: "Account Funding via Paystack",
      createdAt: "2026-03-19T14:30:00Z",
    },
    {
      id: "txn_109284",
      reference: "KBC-TRF-002",
      type: "DEBIT",
      amount: 125000,
      status: "SUCCESS",
      description: "Transfer to John Doe",
      createdAt: "2026-03-19T16:45:12Z",
    },
    {
      id: "txn_109285",
      reference: "KBC-TRF-003",
      type: "DEBIT",
      amount: 800000,
      status: "PENDING",
      description: "Airtime Purchase",
      createdAt: "2026-03-20T08:10:00Z",
    },
    {
      id: "txn_109286",
      reference: "KBC-TRF-004",
      type: "DEBIT",
      amount: 1500000,
      status: "FAILED",
      description: "Transfer to Jane Smith (Insufficient Funds)",
      createdAt: "2026-03-20T09:05:22Z",
    },
  ];