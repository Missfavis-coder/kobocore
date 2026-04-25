import { API_ROUTES, apiClient } from "../api ";
import {  DeleteMediaResponse, Media, RenameMediaParams, RenameMediaResponse,  UploadMediaResponse } from "../types/dashboard";
import { NotificationsParams, NotificationsResponse, MarkAllNotificationsReadResponse, MarkNotificationReadResponse } from "../types/notification"


export const dashboardService = {
    medias: {
      async get(
      ): Promise<Media[]> {
        return apiClient.get<Media[]>(
          API_ROUTES.dashboard.medias.get,
        
        );
      },

      async upload(
        formData?: FormData
      ): Promise<UploadMediaResponse> {
        return apiClient.post<UploadMediaResponse>(
          API_ROUTES.dashboard.medias.upload,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          }
        );
      },

      async rename(
        params: RenameMediaParams
      ): Promise<RenameMediaResponse> {
        const {mediaId, newName} = params;
        return apiClient.patch<RenameMediaResponse>(
          API_ROUTES.dashboard.medias.rename(mediaId),
          { newName }
        );
      },

      async delete(
        id: string
      ): Promise<DeleteMediaResponse> {
        return apiClient.delete<DeleteMediaResponse>(
          API_ROUTES.dashboard.medias.deleteMedia(id),
        );
      },

      async restore(
        id: string
      ): Promise<DeleteMediaResponse> {
        return apiClient.patch<DeleteMediaResponse>(
          API_ROUTES.dashboard.medias.restoreMedia(id),
        );
      },
    },

    notifications: {
        async getList(
          params?: NotificationsParams
        ): Promise<NotificationsResponse> {
          return apiClient.get<NotificationsResponse>(
            API_ROUTES.dashboard.notifications.list,
            { params }
          );
        },
    
        async markAsRead(id: string): Promise<MarkNotificationReadResponse> {
          return apiClient.patch<MarkNotificationReadResponse>(
            API_ROUTES.dashboard.notifications.markRead(id)
          );
        },
    
        async markAllAsRead(): Promise<MarkAllNotificationsReadResponse> {
          return apiClient.patch<MarkAllNotificationsReadResponse>(
            API_ROUTES.dashboard.notifications.markAllRead
          );
        },
      },
    

  };
  