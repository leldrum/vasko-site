import { Concert } from "./concert-model";
import { mediaType } from "./enum/mediaType";
import { User } from "./user-model";

export interface Media {
  id: number;
  rehearsal_id: number;
  concert_id: number;
  user_id: number;
  type: mediaType;
  description: string;
  url: string;
  filename: string;
  originalFilename: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export interface MediaCreate {
  rehearsal_id: Rehearsal | null;
  concert_id: Concert | null;
  user_id: User;
  type: mediaType;
  description: string;
}