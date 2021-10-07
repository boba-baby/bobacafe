export type Rarity = "Common" | "Rare" | "Ultra Rare" | "Secret Rare";
export type Layer = {
  zIndex: number;
  fileName: string;
};
export type Layers = Array<Layer>;
export type Trait = {
  traitName: string;
  subTraitName: string | undefined;
  // rarity is a number from 0 to 1
  // 1 means default rarity (usually common)
  // 0.1 means 1/10th as likely as each other trait in the category
  // 0 means impossible
  rarity: number;
  rarityName: Rarity;
  /**
   * A number between 0 and 1, representing percentage frequency
   */
  rarityFrequency: number;
  layers: Layers;
};
export type TraitCategory = {
  traitType: TraitType;
  traits: Array<Trait>;
};
export type TraitType =
  | "Background"
  | "Overlay"
  | "Cup"
  | "Drink"
  | "Blush"
  | "Straw"
  | "Lid"
  | "Eyes"
  | "Boba"
  | "Glasses"
  | "Accessory"
  | "Sticker";

export const allTraitTypes: TraitType[] = [
  "Background",
  "Overlay",
  "Cup",
  "Drink",
  "Blush",
  "Straw",
  "Lid",
  "Eyes",
  "Boba",
  "Glasses",
  "Accessory",
  "Sticker",
];

export type TraitTypeAndVariant = TraitType | "LidVariant";

export type BabyArtDefinition = Record<TraitType, TraitCategory>;

export type FullBobaBaby = {
  Background: string;
  Overlay: string;
  Cup: string;
  Drink: string;
  Blush: string;
  Straw: string;
  Lid: [string, string];
  Eyes: string;
  Boba: string;
  Glasses: string;
  Accessory: string;
  Sticker: string;
};

export type TraitTuple = {
  traitType: TraitType;
  trait: Trait;
};
