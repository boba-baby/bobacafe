import { babyArtDefinition } from "../babyArtDefinition";
import { FullBobaBaby, Trait, TraitType } from "../IArtDef";
import { Roooool } from "../Roooooller";

export const pullAtUniform = (traitType: TraitType): string => {
  return babyArtDefinition[traitType].traits[
    Math.floor(Math.random() * babyArtDefinition[traitType].traits.length)
  ].traitName;
};

export const pullAtUniformWithExclude = (
  traitType: TraitType,
  traitToExclude: string
) => {
  let pull = pullAtUniform(traitType);

  for (let i = 0; i < 10; i++) {
    if (pull !== traitToExclude) {
      return pull;
    }
    pull = pullAtUniform(traitType);
  }
  return pull;
};

export const pullAtUniformWithMoreNoneChance = (
  traitType: TraitType,
  noneChance: number
) => {
  if (Math.random() < noneChance) {
    return "None";
  }
  return pullAtUniform(traitType);
};

export const pullLidAtUniform = (): Trait => {
  return babyArtDefinition.Lid.traits[
    Math.floor(Math.random() * babyArtDefinition.Lid.traits.length)
  ];
};
export const pullLidVariationAtUniform = (lidTraitName: string): Trait => {
  const sameTypeLids: Trait[] = [];
  babyArtDefinition.Lid.traits.forEach((trait) => {
    if (trait.traitName === lidTraitName) {
      sameTypeLids.push(trait);
    }
  });
  return sameTypeLids[Math.floor(Math.random() * sameTypeLids.length)];
};

// More realistic
export const pullAtOdds = (traitType: TraitType) => {
  let cumulative = 0;
  let random = Math.random();
  const traits = babyArtDefinition[traitType].traits;
  for (const trait of traits) {
    if (cumulative + trait.rarityFrequency > random) {
      return trait.traitName;
    }
    cumulative += trait.rarityFrequency;
  }
  return "";
};

const deduplicateLids: Record<string, boolean> = {};
// impure
export const generateLoadedRandom = (): FullBobaBaby => {
  let randomLid =
    babyArtDefinition.Lid.traits[
      Math.floor(Math.random() * babyArtDefinition.Lid.traits.length)
    ];

  // reroll
  if (deduplicateLids[randomLid.traitName + "*" + randomLid.subTraitName]) {
    randomLid =
      babyArtDefinition.Lid.traits[
        Math.floor(Math.random() * babyArtDefinition.Lid.traits.length)
      ];
  }

  // reroll
  if (deduplicateLids[randomLid.traitName + "*" + randomLid.subTraitName]) {
    randomLid =
      babyArtDefinition.Lid.traits[
        Math.floor(Math.random() * babyArtDefinition.Lid.traits.length)
      ];
  }

  // reroll
  if (deduplicateLids[randomLid.traitName + "*" + randomLid.subTraitName]) {
    randomLid =
      babyArtDefinition.Lid.traits[
        Math.floor(Math.random() * babyArtDefinition.Lid.traits.length)
      ];
  }

  deduplicateLids[randomLid.traitName + "*" + randomLid.subTraitName] = true;
  return {
    Lid: [randomLid.traitName, randomLid.subTraitName!!],

    Straw: pullAtUniformWithExclude("Straw", "None"),
    Accessory: pullAtUniformWithMoreNoneChance("Accessory", 0.4),
    Eyes: pullAtUniform("Eyes"),
    Glasses: pullAtUniformWithMoreNoneChance("Glasses", 0.4),
    Blush: pullAtUniform("Blush"),
    Sticker: pullAtUniformWithMoreNoneChance("Sticker", 0.4),
    Cup: pullAtOdds("Cup"),
    Drink: pullAtUniform("Drink"),
    Boba: pullAtUniform("Boba"),
    Background: pullAtUniform("Background"),
  };
};

export const rooooolRandomFromHash = (): FullBobaBaby => {
  const fakeRandomHash = Buffer.from(
    new Uint16Array([
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
      Math.floor(Math.random() * 65536),
    ])
  ).toString("hex");

  const hash = fakeRandomHash;

  return Roooool(hash);
};
