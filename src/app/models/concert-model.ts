import { concertType } from "./enum/concertType";
import { Media } from "./media-model";

export interface Concert {
  id: number;
  title: string;
  description: string[];
  date: string;
  city: string;
  address: string;
  link_maps: string;
  time: string;
  type: concertType;
  medias: Media[];
}

export interface ConcertCreate {
  title: string;
  description: string[];
  date: string;
  city: string;
  address: string;
  link_maps: string;
  time: string;
  type: concertType;
}