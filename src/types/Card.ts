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
  id: string;
  tag: string;
  name: string;
  rarity: Rarity;
  image: string;
  wave: string;
  shopEligibility: number;
  count: number;
}
