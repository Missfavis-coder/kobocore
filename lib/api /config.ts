export const getBaseUrl = (): string => {
    const fromEnv = process.env.NEXT_PUBLIC_API_URL;
    const normalized = fromEnv ? fromEnv.replace(/\/$/, "") : undefined;
    return normalized || "http://localhost:5500/api/v1";
  };
  
  export const API_ROUTES = {
    auth: {
      signup: "/auth/sign-up",
      signout: "/auth/sign-out",
      signin: "/auth/sign-in",
      forgotpassword: "/auth/forgot-password",
      verifyEmail: "/auth/verify-email",
      getProfile: "/api/v1/auth/get-profile",
      forgotPassword: "/auth/forgot-password",
      resetPassword: "/auth/reset-password",
    },
    users: {
      get:  (id: string) => `/users/:${id}`,
    },

    dashboard: {
      medias: {
        get: "/medias",
        upload: "/medias/upload",
        rename: (mediaId: string) => `/medias/rename/:${mediaId}`,
        bulkdownload: "/medias/bulk-download",
        deleteMedia:  (id: string) => `/medias/:${id}`,
        restoreMedia: (id: string) => `/medias/:${id}/restore`,
        expiry:  (id: string) => `/medias/:${id}/expiry`,
      },

      notifications: {
        list: "/notifications",
        markRead: (id: string) => `notifications/:${id}/read`,
        markAllRead: "/dashboard/notifications/mark-all-read",
      }
    },
  } as const;
  