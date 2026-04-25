type TransactionType = "FUNDING" | "EXCHANGE" | "ESCROW" | "DISPUTE";

type TransactionStatus = "SUCCESS" | "HELD" | "DISPUTED";

interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  direction: "IN" | "OUT";
  amount: number;
  currency: "NGN" | "PTS";
  reference: string;
  description?: string;
  createdAt: string | Date;
}