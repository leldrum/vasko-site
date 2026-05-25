interface Rehearsal {
  id: number;
  date: string;
  description: string;
  medias: Media[];
}

interface RehearsalCreate {
  date: string;
  description: string;
}