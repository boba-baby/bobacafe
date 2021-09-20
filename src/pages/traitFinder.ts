import { babyArtDefinition } from "../babyArtDefinition";
import { allTraitTypes, Rarity, Trait, TraitType } from "../IArtDef";

const typeToTrait: Record<TraitType, Record<string, Trait>> = {
  Background: {},
  Cup: {},
  Drink: {},
  Blush: {},
  Straw: {},
  Lid: {},
  Eyes: {},
  Boba: {},
  Glasses: {},
  Accessory: {},
  Sticker: {},
};

function generateTsUnions() {
  for (const traitType of allTraitTypes) {
    for (const trait of babyArtDefinition[traitType].traits) {
      if (traitType === "Lid") {
        typeToTrait[traitType][`${trait.traitName}-${trait.subTraitName}`] =
          trait;
      } else {
        typeToTrait[traitType][trait.traitName] = trait;
      }
    }
  }
}
generateTsUnions();

export const traitFinder = (
  traitType: TraitType,
  traitName: string,
  subTraitName?: string
): Trait | undefined => {
  if (traitType === "Lid") {
    return typeToTrait[traitType][`${traitName}-${subTraitName}`];
  } else {
    return typeToTrait[traitType][traitName];
  }
};

export const compoundedTraitFinder = (
  traitType: TraitType,
  compoundedTraitName: string
): Trait | undefined => {
  return typeToTrait[traitType][compoundedTraitName];
};

// For lids, it will sum up all the lids of the same variation
export const rarityFinder = (
  traitType: TraitType,
  traitName: string
): [number, Rarity] => {
  if (traitType === "Lid") {
    let total = 0;
    let rarityName: Rarity = "Common";
    for (const currentTraitName in typeToTrait[traitType]) {
      if (currentTraitName.startsWith(traitName + "-")) {
        total += typeToTrait[traitType][currentTraitName].rarityFrequency;
        rarityName = minRarity(
          rarityName,
          typeToTrait[traitType][currentTraitName].rarityName
        );
      }
    }
    return [total, rarityName];
  } else if (typeToTrait[traitType][traitName]) {
    return [
      typeToTrait[traitType][traitName].rarityFrequency,
      typeToTrait[traitType][traitName].rarityName,
    ];
  } else {
    return [888.88, "Ultra Rare"];
  }
};

export const variationRarityFinder = (
  traitName: string,
  subTraitName: string
): [number, Rarity] => {
  let total = 0;
  let subtraitRarity = 0;
  let rarityName: Rarity = "Common";
  for (const currentTraitName in typeToTrait["Lid"]) {
    if (currentTraitName.startsWith(traitName + "-")) {
      total += typeToTrait["Lid"][currentTraitName].rarityFrequency;
      if (currentTraitName === `${traitName}-${subTraitName}`) {
        subtraitRarity = typeToTrait["Lid"][currentTraitName].rarityFrequency;
        rarityName = typeToTrait["Lid"][currentTraitName].rarityName;
      }
    }
  }
  if (total === 0) {
    return [99999, "Ultra Rare"];
  }

  return [subtraitRarity / total, rarityName];
};

export const minRarity = (rarityName1: Rarity, rarityName2: Rarity): Rarity => {
  if (rarityName1 === "Common" || rarityName2 === "Common") {
    return "Common";
  }
  if (rarityName1 === "Rare" || rarityName2 === "Rare") {
    return "Rare";
  }
  return "Ultra Rare";
};
