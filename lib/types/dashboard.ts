export interface Media {
    _id: string;
    fileName: string;
    originalName: string;
    path: string;
    url?: string;
    expiresAt?: string | null;
    createdAt: string;
    updatedAt?: string;
  }
  

export interface DashboardOverviewParams {
  file: File;
}

export interface DashboardOverviewResponse {
  message:  boolean;
  
}

export interface  UploadMediaParams{
    files: File[];
}

export interface UploadMediaResponse {
  message: string;
  url: Media[];
}


export interface  RenameMediaParams{
  mediaId: string;
  newName: string;
}

export interface RenameMediaResponse {
  message: string;
  media: Media;
}


export interface  DeleteMediaParams{
  id: string;
}

export interface DeleteMediaResponse {
  message: string;
}


export interface  RestoreMediaParams{
  id: string;
}

export interface RestoreMediaResponse {
  message: string;
}


export interface  MediaExpiryParams{
   id: string;
   expiresAt: string;
}

export interface MediaExpiryResponse {
   message: string;
}
