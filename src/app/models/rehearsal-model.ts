import { Media } from "./media-model";

export interface Rehearsal {
  id: number;
  date: string;
  description: string;
  medias: Media[];
}

export interface RehearsalCreate {
  date: string;
  description: string;
}