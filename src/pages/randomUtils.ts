import { babyArtDefinition } from "../babyArtDefinition";
import { FullBobaBaby, Trait, TraitType } from "../IArtDef";
import { Rectifier, Roooool } from "../Roooooller";

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

export const tryUntilNonSecret = (puller: () => string): string => {
  let pull = puller();
  while (pull.includes("Secret")) {
    // console.log("Got secret. Repulling", pull);
    pull = puller();
  }
  return pull;
};

export const pullLidAtUniform = (): Trait => {
  return babyArtDefinition.Lid.traits[
    Math.floor(Math.random() * babyArtDefinition.Lid.traits.length)
  ];
};

export const pullNonSecretLidAtUniform = (): Trait => {
  let lid = pullLidAtUniform();

  for (let i = 0; i < 10; i++) {
    if (
      !lid.traitName.includes("Secret") &&
      !lid.subTraitName!!.includes("Secret")
    ) {
      return lid;
    }
    lid = pullLidAtUniform();
  }
  return lid;
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

export const pullNonSecretLidVariationAtUniform = (
  lidTraitName: string
): Trait => {
  const sameTypeLids: Trait[] = [];
  babyArtDefinition.Lid.traits.forEach((trait) => {
    if (trait.traitName === lidTraitName) {
      sameTypeLids.push(trait);
    }
  });
  let lid = sameTypeLids[Math.floor(Math.random() * sameTypeLids.length)];
  for (let i = 0; i < 10; i++) {
    if (
      !lid.traitName.includes("Secret") &&
      !lid.subTraitName!!.includes("Secret")
    ) {
      return lid;
    }
    lid = sameTypeLids[Math.floor(Math.random() * sameTypeLids.length)];
  }
  return lid;
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

export const pickLoadedLid = (): Trait => {
  let found = false;

  let randomLid: Trait;
  let attempt = 0;
  while (!found && attempt < 10) {
    randomLid =
      babyArtDefinition.Lid.traits[
        Math.floor(Math.random() * babyArtDefinition.Lid.traits.length)
      ];

    attempt++;

    if (
      !randomLid.traitName.includes("Secret") &&
      !randomLid.subTraitName!!.includes("Secret")
    ) {
      found = true;
    }
  }

  deduplicateLids[randomLid!!.traitName + "-" + randomLid!!.subTraitName] =
    true;

  return randomLid!!;
};

// impure
export const generateLoadedRandom = (): FullBobaBaby => {
  let randomLid = pickLoadedLid();

  // reroll
  if (deduplicateLids[randomLid.traitName + "*" + randomLid.subTraitName]) {
    randomLid = pickLoadedLid();
  }
  // reroll
  if (deduplicateLids[randomLid.traitName + "*" + randomLid.subTraitName]) {
    randomLid = pickLoadedLid();
  }
  // reroll
  if (deduplicateLids[randomLid.traitName + "*" + randomLid.subTraitName]) {
    randomLid = pickLoadedLid();
  }

  deduplicateLids[randomLid.traitName + "*" + randomLid.subTraitName] = true;
  return Rectifier({
    Lid: [randomLid.traitName, randomLid.subTraitName!!],

    Straw: tryUntilNonSecret(() => pullAtUniformWithExclude("Straw", "None")),
    Accessory: tryUntilNonSecret(() =>
      pullAtUniformWithMoreNoneChance("Accessory", 0.5)
    ),
    Eyes: tryUntilNonSecret(() => pullAtUniform("Eyes")),
    Glasses: tryUntilNonSecret(() =>
      pullAtUniformWithMoreNoneChance("Glasses", 0.5)
    ),
    Blush: tryUntilNonSecret(() => pullAtUniform("Blush")),
    Sticker: tryUntilNonSecret(() =>
      pullAtUniformWithMoreNoneChance("Sticker", 0.5)
    ),
    Cup: "White",
    Overlay: tryUntilNonSecret(() => pullAtOdds("Overlay")),
    Drink: tryUntilNonSecret(() => pullAtUniform("Drink")),
    Boba: tryUntilNonSecret(() => pullAtUniform("Boba")),
    Background: tryUntilNonSecret(() => pullAtOdds("Background")), // show the simpler ones first, because some exotic ones really stand out
  });
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
