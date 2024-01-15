export type Rarity =
  | "Common"
  | "Rare"
  | "Super Rare"
  | "Ultimate Rare"
  | "Ghost Rare"
  | "Doubles"
  | "Promo"
  | "Utility";

export interface ICard {
  count: number;
  id: string;
  tag: string;
  name: string;
  rarity: Rarity;
  img: string;
  wave: string;
}

export type CardCountType = { rarity: Rarity; count: number };
