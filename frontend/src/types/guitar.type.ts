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

export type CreateGuitarDto = {
  name: string;
  photo: string;
  type: GuitarTypes;
  article: string;
  stringsCount: number;
  price: number;
  description: string;
}

export type UpdateGuitarDto = {
  id: string;
  name?: string;
  photo?: string;
  type?: GuitarTypes;
  article?: string;
  stringsCount?: number;
  price?: number;
  description?: string;
}
