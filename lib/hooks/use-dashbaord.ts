import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dashboardService } from "../services/dashboard.services";
import { queryKeys } from "@/lib/query/query-keys";
import type { DashboardOverviewParams, DeleteMediaParams, Media, RenameMediaParams, UploadMediaParams } from "../types/dashboard";
import { NotificationsParams } from "../types/notification";

export const useGetMedia = () => {
  return useQuery <Media[]>({
    queryKey: queryKeys.dashboard.medias.get(),
    queryFn: () => dashboardService.medias.get(),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};


export const useUploadMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (files: File[]) => {
      const formData = new FormData();
      
      files.forEach((file) => {
        formData.append("file", file);
      });
     return dashboardService.medias.upload(formData);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.medias.get(),
      });
    },

    onError: (err: any) => {
      console.log("FULL ERROR:", err);
      toast.error(err?.response?.data?.message || "Upload failed");
    },
    
  });
};


export const useRenameMedia = (id: string) => {

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params:RenameMediaParams) => dashboardService.medias.rename(params),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.medias.get() });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Rename failed");
    },
    
  });
};


export const useDeleteMedia = () => {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (id: string) => dashboardService.medias.delete(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.medias.get() });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Delete failed");
    },
  });
};



export const useNotifications = (params?: NotificationsParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.notifications.list(params),
    queryFn: () => dashboardService.notifications.getList(params),
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dashboardService.notifications.markAsRead(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.dashboard.notifications.list(),
      });

      const previousData = queryClient.getQueriesData({
        queryKey: queryKeys.dashboard.notifications.list(),
      });

      queryClient.setQueriesData(
        {
          queryKey: queryKeys.dashboard.notifications.list(),
        },
        (old: any) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((n: any) =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, (old.unreadCount || 0) - 1),
          };
        }
      );

      return { previousData };
    },
    onError: (error: Error, _id, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error(error.message || "Failed to mark notification as read");
      console.error("Mark notification read error:", error);
    },
    onSuccess: () => {
      toast.success("Notification marked as read");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.notifications.list(),
      });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => dashboardService.notifications.markAllAsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.dashboard.notifications.list(),
      });

      const previousData = queryClient.getQueriesData({
        queryKey: queryKeys.dashboard.notifications.list(),
      });

      queryClient.setQueriesData(
        {
          queryKey: queryKeys.dashboard.notifications.list(),
        },
        (old: any) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((n: any) => ({ ...n, read: true })),
            unreadCount: 0,
          };
        }
      );

      return { previousData };
    },
    onError: (error: Error, _vars, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error(error.message || "Failed to mark all notifications as read");
      console.error("Mark all notifications read error:", error);
    },
    onSuccess: () => {
      toast.success("All notifications marked as read");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.notifications.list(),
      });
    },
  });
};
