import { DashboardOverviewParams, RenameMediaParams, UploadMediaParams } from "../types/dashboard";
import { NotificationsParams } from "../types/notification";

  export const queryKeys = {
    profile: {
      current: () => ["profile", "current"] as const,
    },
    health: {
      check: () => ["health"] as const,
    },
    whatsapp: {
      status: () => ["whatsapp", "status"] as const,
    },
    auth: {
      profile: ["auth", "profile"] as const,
    },
    dashboard: {
      medias: {
        get: (params?: DashboardOverviewParams) => ["dashboard", "medias", "get", params] as const,

        upload: (params?: UploadMediaParams) => 
          ["dashboard", "medias", "upload", params] as const,
  
        rename: (params: RenameMediaParams) => 
          ["dashboard", "medias", "rename", params] as const,
  
        delete: (id: string) => 
          ["dashboard", "medias", "delete", id] as const,
  
        restore: (id: string) => 
          ["dashboard", "medias", "restore", id] as const,
      },
      
      notifications: {
        list: (params?: NotificationsParams) => ["dashboard", "notifications", params] as const,
        
        markAsRead: (id: string) => 
          ["dashboard", "notifications", "markAsRead", id] as const,
  
        markAllAsRead: () => 
          ["dashboard", "notifications", "markAllAsRead"] as const,
      }
    },
  } as const;
  