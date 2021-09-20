import { babyArtDefinition } from "./babyArtDefinition";

export const uniqueTraits =
  babyArtDefinition.Lid.traits.length +
  babyArtDefinition.Straw.traits.length +
  babyArtDefinition.Accessory.traits.length +
  babyArtDefinition.Eyes.traits.length +
  babyArtDefinition.Glasses.traits.length +
  babyArtDefinition.Blush.traits.length +
  babyArtDefinition.Sticker.traits.length +
  babyArtDefinition.Cup.traits.length +
  babyArtDefinition.Drink.traits.length +
  babyArtDefinition.Boba.traits.length +
  babyArtDefinition.Background.traits.length -
  6; // minus 6 because there are 6 "None" traits, not including invisible cup, so all 7 of these empty PNGs are actually one unique trait

// TODO: Account for the special ones
export const totalPossibilities =
  babyArtDefinition.Lid.traits.length *
  babyArtDefinition.Straw.traits.length *
  babyArtDefinition.Accessory.traits.length *
  babyArtDefinition.Eyes.traits.length *
  babyArtDefinition.Glasses.traits.length *
  babyArtDefinition.Blush.traits.length *
  babyArtDefinition.Sticker.traits.length *
  babyArtDefinition.Cup.traits.length *
  babyArtDefinition.Drink.traits.length *
  babyArtDefinition.Boba.traits.length *
  babyArtDefinition.Background.traits.length;
