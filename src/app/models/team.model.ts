export interface Team {
    id: number;
    name: string;
    members: number[]; // Array de IDs de héroes
    established: Date;
  }