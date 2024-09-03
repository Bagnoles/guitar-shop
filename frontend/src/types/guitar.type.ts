import { GuitarTypes } from "./guitar-types.enum";

export type Guitar = {
  id: string;
  name: string;
  date: string;
  photo: string;
  type: GuitarTypes;
  article: string;
  stringsCount: number;
  price: number;
  description: string;
}
