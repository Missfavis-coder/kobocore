import { ID, Timestamp, PaginatedResponse } from "./common";

// WALLET

export type Wallet = {
  balance_kobo: number;
  balance_ngn_formatted: string;
};

export type PointsWallet = {
  balance_points: number;
};

export type WalletResponse = {
  wallet: Wallet;
  points_wallet: PointsWallet;
};

export type TransactionType = "NGN" | "POINTS";

export type Transaction = {
  id: ID;
  type: TransactionType;
  amount: number;
  description?: string;
  created_at: Timestamp;
};

export type TransactionsParams = {
  page?: number;
  limit?: number;
  type?: TransactionType;
  from?: string;
  to?: string;
};

export type TransactionsResponse = PaginatedResponse<Transaction>;

// FUNDING

export type FundingStatus = "PENDING" | "COMPLETED" | "FAILED";

export type InitiateFundingParams = {
  amount_kobo: number;
  idempotency_key: string;
};

export type FundingInitiateResponse = {
  funding_id: ID;
  payment_url: string;
  provider_reference: string;
  status: "PENDING";
};

export type FundingDetailsResponse = {
  id: ID;
  amount_kobo: number;
  status: FundingStatus;
  created_at: Timestamp;
  settled_at?: Timestamp | null;
};


// TRANSFERS (ESCROW)

export type TransferStatus =
  | "ESCROWED"
  | "RELEASE_REQUESTED"
  | "COMPLETED"
  | "DISPUTED";

export type CreateTransferParams = {
  recipient_id: ID;
  amount_points: number;
  description?: string;
  idempotency_key: string;
};

export type CreateTransferResponse = {
  transfer_id: ID;
  status: "ESCROWED";
  sender_balance_after: number;
};

export type TransferDetails = {
  transfer_id: ID;
  sender_id: ID;
  recipient_id: ID;
  amount_points: number;
  description?: string;
  status: TransferStatus;
  created_at: Timestamp;
};

export type TransferReceiptResponse = {
  transfer_id: ID;
  status: "COMPLETED";
  recipient_balance_after: number;
};


// DISPUTES

export type DisputeStatus = "OPEN" | "RESOLVED" | "REJECTED";

export type CreateDisputeParams = {
  reason: string;
};

export type CreateDisputeResponse = {
  dispute_id: ID;
  status: "OPEN";
};

export type SubmitEvidenceParams = {
  content: string;
};

export type SubmitEvidenceResponse = {
  evidence_id: ID;
  created_at: Timestamp;
};

export type Dispute = {
  id: ID;
  transfer_id: ID;
  status: DisputeStatus;
  reason: string;
  created_at: Timestamp;
};

export type Evidence = {
  id: ID;
  content: string;
  created_at: Timestamp;
};

export type DisputeDetailsResponse = {
  dispute: Dispute;
  evidence: Evidence[];
};


// EXCHANGE
export type ExchangeParams = {
  amount_points: number;
  idempotency_key: string;
};

export type ExchangeResponse = {
  exchange_id: ID;
  amount_kobo: number;
  status: "COMPLETED";
};


// WITHDRAWALS

export type WithdrawalParams = {
  amount_kobo: number;
  bank_account_number: string;
  bank_code: string;
  account_name: string;
  idempotency_key: string;
};

export type WithdrawalResponse = {
  withdrawal_id: ID;
  status: "PENDING";
};


// API KEYS

export type CreateApiKeyParams = {
  name: string;
  scopes: string[];
};

export type ApiKeyResponse = {
  id: ID;
  key_prefix: string;
  raw_key?: string; // only returned once
  name: string;
  scopes: string[];
};

export type ExchangeApiKeyResponse = {
  accessToken: string;
};


// SYSTEM
export type HealthResponse = {
  status: "ok";
  timestamp: string;
};