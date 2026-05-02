import { apiClient, API_ROUTES } from "../api ";
import {
  WalletResponse,
  TransactionsResponse,
  FundingInitiateResponse,
  FundingDetailsResponse,
  CreateTransferParams,
  CreateTransferResponse,
  TransferDetails,
  TransferReceiptResponse,
  CreateDisputeResponse,
  DisputeDetailsResponse,
  SubmitEvidenceResponse,
  ExchangeResponse,
  WithdrawalResponse,
  ApiKeyResponse,
  ExchangeApiKeyResponse,
} from "../types/dashboard";

export const dashboardService = {
  wallet: {
    async get(): Promise<WalletResponse> {
      return apiClient.get(API_ROUTES.wallet.get);
    },

    async transactions(params?: {
      page?: number;
      limit?: number;
      type?: "NGN" | "POINTS";
      from?: string;
      to?: string;
    }): Promise<TransactionsResponse> {
      return apiClient.get(API_ROUTES.wallet.transactions, { params });
    },
  },

  funding: {
    async initiate(data: {
      amount_kobo: number;
      idempotency_key: string;
    }): Promise<FundingInitiateResponse> {
      return apiClient.post(API_ROUTES.funding.initiate, data);
    },

    async get(id: string): Promise<FundingDetailsResponse> {
      return apiClient.get(API_ROUTES.funding.get(id));
    },
  },

  transfers: {
    async create(data: CreateTransferParams): Promise<CreateTransferResponse> {
      return apiClient.post(API_ROUTES.transfers.create, data);
    },

    async get(id: string): Promise<TransferDetails> {
      return apiClient.get(API_ROUTES.transfers.get(id));
    },

    async list(): Promise<TransferDetails[]> {
      return apiClient.get(API_ROUTES.transfers.list);
    },

    async release(id: string): Promise<void> {
      return apiClient.post(API_ROUTES.transfers.release(id));
    },

    async receipt(id: string): Promise<TransferReceiptResponse> {
      return apiClient.post(API_ROUTES.transfers.receipt(id));
    },

    async dispute(
      id: string,
      data: { reason: string }
    ): Promise<CreateDisputeResponse> {
      return apiClient.post(API_ROUTES.transfers.dispute(id), data);
    },
  },

  disputes: {
    async get(id: string): Promise<DisputeDetailsResponse> {
      return apiClient.get(API_ROUTES.disputes.get(id));
    },

    async submitEvidence(
      id: string,
      data: { content: string }
    ): Promise<SubmitEvidenceResponse> {
      return apiClient.post(API_ROUTES.disputes.evidence(id), data);
    },
  },

  exchange: {
    async convert(data: {
      amount_points: number;
      idempotency_key: string;
    }): Promise<ExchangeResponse> {
      return apiClient.post(API_ROUTES.exchange.convert, data);
    },
  },

  withdrawals: {
    async create(data: {
      amount_kobo: number;
      bank_account_number: string;
      bank_code: string;
      account_name: string;
      idempotency_key: string;
    }): Promise<WithdrawalResponse> {
      return apiClient.post(API_ROUTES.withdrawals.create, data);
    },
  },

  apiKeys: {
    async create(data: {
      name: string;
      scopes: string[];
    }): Promise<ApiKeyResponse> {
      return apiClient.post(API_ROUTES.apiKeys.create, data);
    },

    async list(): Promise<ApiKeyResponse[]> {
      return apiClient.get(API_ROUTES.apiKeys.list);
    },

    async revoke(id: string): Promise<void> {
      return apiClient.delete(API_ROUTES.apiKeys.revoke(id));
    },

    async exchange(): Promise<ExchangeApiKeyResponse> {
      return apiClient.post(API_ROUTES.apiKeys.exchange);
    },
  },
};