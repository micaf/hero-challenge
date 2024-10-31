
export interface Power {
  id: number;
  name: string;
  description: string;
  type: string;
  isUnique: boolean; // Indica si el poder es único o compartido
}