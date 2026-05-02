import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dashboardService } from "../services/dashboard.services";
import { queryKeys } from "@/lib/query/query-keys";


// WALLET

export const useWallet = () => {
  return useQuery({
    queryKey: queryKeys.wallet.get(),
    queryFn: () => dashboardService.wallet.get(),
    staleTime: 30 * 1000,
  });
};

export const useTransactions = (params?: {
  page?: number;
  limit?: number;
  type?: "NGN" | "POINTS";
  from?: string;
  to?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.wallet.transactions(params),
    queryFn: () => dashboardService.wallet.transactions(params),
  });
};


// FUNDING

export const useInitiateFunding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardService.funding.initiate,

    onSuccess: () => {
      toast.success("Funding initiated");
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.get() });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Funding failed");
    },
  });
};

export const useFunding = (id: string) => {
  return useQuery({
    queryKey: queryKeys.funding.get(id),
    queryFn: () => dashboardService.funding.get(id),
    enabled: !!id,
  });
};


// TRANSFERS

export const useCreateTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardService.transfers.create,

    onSuccess: () => {
      toast.success("Transfer created (in escrow)");
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.get() });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Transfer failed");
    },
  });
};

export const useTransfer = (id: string) => {
  return useQuery({
    queryKey: queryKeys.transfers.get(id),
    queryFn: () => dashboardService.transfers.get(id),
    enabled: !!id,
  });
};

export const useTransfers = () => {
  return useQuery({
    queryKey: queryKeys.transfers.list(),
    queryFn: () => dashboardService.transfers.list(),
  });
};

export const useReleaseTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dashboardService.transfers.release(id),

    onSuccess: () => {
      toast.success("Release authorized");
      queryClient.invalidateQueries({ queryKey: queryKeys.transfers.list() });
    },
  });
};

export const useConfirmReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dashboardService.transfers.receipt(id),

    onSuccess: () => {
      toast.success("Transfer completed");
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.get() });
      queryClient.invalidateQueries({ queryKey: queryKeys.transfers.list() });
    },
  });
};

export const useDisputeTransfer = () => {
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      dashboardService.transfers.dispute(id, { reason }),

    onSuccess: () => {
      toast.success("Dispute opened");
    },
  });
};


// DISPUTES

export const useDispute = (id: string) => {
  return useQuery({
    queryKey: queryKeys.disputes.get(id),
    queryFn: () => dashboardService.disputes.get(id),
    enabled: !!id,
  });
};

export const useSubmitEvidence = () => {
  return useMutation({
    mutationFn: ({
      id,
      content,
    }: {
      id: string;
      content: string;
    }) => dashboardService.disputes.submitEvidence(id, { content }),

    onSuccess: () => {
      toast.success("Evidence submitted");
    },
  });
};



// EXCHANGE

export const useExchange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardService.exchange.convert,

    onSuccess: () => {
      toast.success("Points converted");
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.get() });
    },
  });
};



// WITHDRAWALS

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardService.withdrawals.create,

    onSuccess: () => {
      toast.success("Withdrawal requested");
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.get() });
    },
  });
};



// API KEYS

export const useApiKeys = () => {
  return useQuery({
    queryKey: queryKeys.apiKeys.list(),
    queryFn: () => dashboardService.apiKeys.list(),
  });
};

export const useCreateApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardService.apiKeys.create,

    onSuccess: () => {
      toast.success("API key created");
      queryClient.invalidateQueries({ queryKey: queryKeys.apiKeys.list() });
    },
  });
};

export const useRevokeApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dashboardService.apiKeys.revoke(id),

    onSuccess: () => {
      toast.success("API key revoked");
      queryClient.invalidateQueries({ queryKey: queryKeys.apiKeys.list() });
    },
  });
};