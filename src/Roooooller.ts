import { BabyArtDefinition, FullBobaBaby, Trait } from "./IArtDef";
import * as rawJson from "./babyArtDefinition.json";

// @ts-ignore
export const babyArtDefinition: BabyArtDefinition = rawJson.default;

// I'm a Roooooller
// "I'm randooooom"
// > extracts entropy from a hash seed
// "Prooooovably fair"

const getTraitWithPoint = (traits: Array<Trait>, point: number) => {
  let sumWeight = 0;
  for (const trait of traits) {
    sumWeight += trait.rarity;
  }

  let curWeight = 0;
  for (const trait of traits) {
    curWeight += trait.rarity;
    // console.log(curWeight / sumWeight, point, trait.traitName);
    if (curWeight / sumWeight >= point) {
      return trait;
    }
  }

  return traits[traits.length - 1];
};

export const RooooolWithoutRectifier = (sha256hash: string): FullBobaBaby => {
  if (sha256hash.length !== 64) {
    throw new Error("hash needs to be 64 characters");
  }

  const seedBytes = Buffer.from(sha256hash, "hex");

  // Every item has three bytes (24 bits), except for the background, which is only 2 bytes (16 bits).
  // 10*24 = 240 bits, + 16 bits, which comes out to the 256 bit sha256 hash

  const lidPoint = seedBytes.readUIntBE(0, 3) / 2 ** 24;
  const strawPoint = seedBytes.readUIntBE(3, 3) / 2 ** 24;
  const accessoryPoint = seedBytes.readUIntBE(6, 3) / 2 ** 24;
  const eyesPoint = seedBytes.readUIntBE(9, 3) / 2 ** 24;
  const glassesPoint = seedBytes.readUIntBE(12, 3) / 2 ** 24;
  const blushPoint = seedBytes.readUIntBE(15, 3) / 2 ** 24;
  const stickerPoint = seedBytes.readUIntBE(18, 3) / 2 ** 24;
  const overlayPoint = seedBytes.readUIntBE(21, 3) / 2 ** 24;
  const drinkPoint = seedBytes.readUIntBE(24, 3) / 2 ** 24;
  const bobaPoint = seedBytes.readUIntBE(27, 3) / 2 ** 24;
  const backgroundPoint = seedBytes.readUIntBE(30, 2) / 2 ** 16;

  const lidTrait = getTraitWithPoint(babyArtDefinition.Lid.traits, lidPoint);
  const strawTrait = getTraitWithPoint(
    babyArtDefinition.Straw.traits,
    strawPoint
  );
  const accessoryTrait = getTraitWithPoint(
    babyArtDefinition.Accessory.traits,
    accessoryPoint
  );
  const eyesTrait = getTraitWithPoint(babyArtDefinition.Eyes.traits, eyesPoint);
  const glassesTrait = getTraitWithPoint(
    babyArtDefinition.Glasses.traits,
    glassesPoint
  );
  const blushTrait = getTraitWithPoint(
    babyArtDefinition.Blush.traits,
    blushPoint
  );
  const stickerTrait = getTraitWithPoint(
    babyArtDefinition.Sticker.traits,
    stickerPoint
  );
  const drinkTrait = getTraitWithPoint(
    babyArtDefinition.Drink.traits,
    drinkPoint
  );
  const bobaTrait = getTraitWithPoint(babyArtDefinition.Boba.traits, bobaPoint);
  const backgroundTrait = getTraitWithPoint(
    babyArtDefinition.Background.traits,
    backgroundPoint
  );
  const overlayTrait = getTraitWithPoint(
    babyArtDefinition.Overlay.traits,
    overlayPoint
  );

  return {
    Lid: [lidTrait.traitName, lidTrait.subTraitName!!],
    Straw: strawTrait.traitName,
    Accessory: accessoryTrait.traitName,
    Eyes: eyesTrait.traitName,
    Glasses: glassesTrait.traitName,
    Blush: blushTrait.traitName,
    Sticker: stickerTrait.traitName,
    Cup: "White",
    Drink: drinkTrait.traitName,
    Boba: bobaTrait.traitName,
    Background: backgroundTrait.traitName,
    Overlay: overlayTrait.traitName,
  };
};

export const Roooool = (sha256hash: string): FullBobaBaby => {
  return Rectifier(RooooolWithoutRectifier(sha256hash));
};

// Some traits are incompatible with other traits. For example, the Dough can only have dot eyes, and the CRT has special eyes
export const Rectifier = (baby: FullBobaBaby): FullBobaBaby => {
  const newBaby = Object.assign({}, baby);
  newBaby.Lid = [newBaby.Lid[0], newBaby.Lid[1]];

  if (newBaby.Lid[0] === "Dough" || newBaby.Lid[0] === "Secret.1") {
    newBaby.Eyes = "Dots";
  }

  if (newBaby.Eyes === "Huge Alien" && newBaby.Lid[0] !== "Alien") {
    newBaby.Eyes = "Dots";
  }

  // dough can morph into alien
  if (newBaby.Lid[0] === "Alien" && newBaby.Eyes !== "Dots") {
    newBaby.Eyes = "Huge Alien";
  }

  if (newBaby.Lid[0] === "Rooster") {
    newBaby.Accessory = "None";
  }

  if (
    newBaby.Lid[0] === "Red Panda" ||
    newBaby.Lid[0] === "Cow" ||
    newBaby.Lid[0] === "Bull" ||
    newBaby.Lid[0] === "Ox" ||
    newBaby.Lid[0] === "Unicorn" ||
    newBaby.Lid[0] === "Whale" ||
    newBaby.Lid[0] === "Pumpkin" ||
    newBaby.Lid[0] === "Ice Cream" ||
    newBaby.Lid[0] === "Horse"
  ) {
    newBaby.Blush = "None";
  }

  return newBaby;
};
// TODO Incompatibility system

const RooooollerUnitTest = () => {
  const zeroRoooool = RooooolWithoutRectifier(
    "0000000000000000000000000000000000000000000000000000000000000000"
  );
  if (
    zeroRoooool.Lid[0] !== babyArtDefinition.Lid.traits[0].traitName ||
    zeroRoooool.Lid[1] !== babyArtDefinition.Lid.traits[0].subTraitName
  ) {
    throw new Error("zero roooool wrong");
  }
  if (
    zeroRoooool.Straw !== babyArtDefinition.Straw.traits[0].traitName ||
    zeroRoooool.Straw !== babyArtDefinition.Straw.traits[0].traitName ||
    zeroRoooool.Accessory !== babyArtDefinition.Accessory.traits[0].traitName ||
    zeroRoooool.Eyes !== babyArtDefinition.Eyes.traits[0].traitName ||
    zeroRoooool.Glasses !== babyArtDefinition.Glasses.traits[0].traitName ||
    zeroRoooool.Blush !== babyArtDefinition.Blush.traits[0].traitName ||
    zeroRoooool.Sticker !== babyArtDefinition.Sticker.traits[0].traitName ||
    zeroRoooool.Cup !== babyArtDefinition.Cup.traits[0].traitName ||
    zeroRoooool.Drink !== babyArtDefinition.Drink.traits[0].traitName ||
    zeroRoooool.Boba !== babyArtDefinition.Boba.traits[0].traitName ||
    zeroRoooool.Background !== babyArtDefinition.Background.traits[0].traitName
  ) {
    throw new Error("zero roooool wrong");
  }

  const almostZero = RooooolWithoutRectifier(
    "0000010000010000010000010000010000010000010000010000010000010001"
  );

  if (
    almostZero.Lid[0] !== babyArtDefinition.Lid.traits[0].traitName ||
    almostZero.Lid[1] !== babyArtDefinition.Lid.traits[0].subTraitName
  ) {
    throw new Error("almost zero roooool wrong");
  }
  if (
    almostZero.Straw !== babyArtDefinition.Straw.traits[0].traitName ||
    almostZero.Straw !== babyArtDefinition.Straw.traits[0].traitName ||
    almostZero.Accessory !== babyArtDefinition.Accessory.traits[0].traitName ||
    almostZero.Eyes !== babyArtDefinition.Eyes.traits[0].traitName ||
    almostZero.Glasses !== babyArtDefinition.Glasses.traits[0].traitName ||
    almostZero.Blush !== babyArtDefinition.Blush.traits[0].traitName ||
    almostZero.Sticker !== babyArtDefinition.Sticker.traits[0].traitName ||
    almostZero.Cup !== babyArtDefinition.Cup.traits[0].traitName ||
    almostZero.Drink !== babyArtDefinition.Drink.traits[0].traitName ||
    almostZero.Boba !== babyArtDefinition.Boba.traits[0].traitName ||
    almostZero.Background !== babyArtDefinition.Background.traits[0].traitName
  ) {
    console.log(almostZero.Eyes, babyArtDefinition.Eyes.traits[0]);
    throw new Error("almost zero roooool wrong");
  }

  // RooooolWithoutRectifier("2222222222222222222222222222222222222222222222222222222222222222");

  const almostMaxRoooool = RooooolWithoutRectifier(
    "fffffefffffefffffefffffefffffefffffefffffefffffefffffefffffefffe"
  );
  if (
    almostMaxRoooool.Lid[0] !==
      babyArtDefinition.Lid.traits[babyArtDefinition.Lid.traits.length - 1]
        .traitName ||
    almostMaxRoooool.Lid[1] !==
      babyArtDefinition.Lid.traits[babyArtDefinition.Lid.traits.length - 1]
        .subTraitName
  ) {
    throw new Error("max roooool wrong");
  }
  if (
    almostMaxRoooool.Straw !==
      babyArtDefinition.Straw.traits[babyArtDefinition.Straw.traits.length - 1]
        .traitName ||
    almostMaxRoooool.Straw !==
      babyArtDefinition.Straw.traits[babyArtDefinition.Straw.traits.length - 1]
        .traitName ||
    almostMaxRoooool.Accessory !==
      babyArtDefinition.Accessory.traits[
        babyArtDefinition.Accessory.traits.length - 1
      ].traitName ||
    almostMaxRoooool.Eyes !==
      babyArtDefinition.Eyes.traits[babyArtDefinition.Eyes.traits.length - 1]
        .traitName ||
    almostMaxRoooool.Glasses !==
      babyArtDefinition.Glasses.traits[
        babyArtDefinition.Glasses.traits.length - 1
      ].traitName ||
    almostMaxRoooool.Blush !==
      babyArtDefinition.Blush.traits[babyArtDefinition.Blush.traits.length - 1]
        .traitName ||
    almostMaxRoooool.Sticker !==
      babyArtDefinition.Sticker.traits[
        babyArtDefinition.Sticker.traits.length - 1
      ].traitName ||
    almostMaxRoooool.Cup !==
      babyArtDefinition.Cup.traits[babyArtDefinition.Cup.traits.length - 1]
        .traitName ||
    almostMaxRoooool.Drink !==
      babyArtDefinition.Drink.traits[babyArtDefinition.Drink.traits.length - 1]
        .traitName ||
    almostMaxRoooool.Boba !==
      babyArtDefinition.Boba.traits[babyArtDefinition.Boba.traits.length - 1]
        .traitName ||
    almostMaxRoooool.Background !==
      babyArtDefinition.Background.traits[
        babyArtDefinition.Background.traits.length - 1
      ].traitName
  ) {
    throw new Error("max roooool wrong");
  }

  const maxRoooool = RooooolWithoutRectifier(
    "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );
  if (
    maxRoooool.Lid[0] !==
      babyArtDefinition.Lid.traits[babyArtDefinition.Lid.traits.length - 1]
        .traitName ||
    maxRoooool.Lid[1] !==
      babyArtDefinition.Lid.traits[babyArtDefinition.Lid.traits.length - 1]
        .subTraitName
  ) {
    throw new Error("max roooool wrong");
  }
  if (
    maxRoooool.Straw !==
      babyArtDefinition.Straw.traits[babyArtDefinition.Straw.traits.length - 1]
        .traitName ||
    maxRoooool.Straw !==
      babyArtDefinition.Straw.traits[babyArtDefinition.Straw.traits.length - 1]
        .traitName ||
    maxRoooool.Accessory !==
      babyArtDefinition.Accessory.traits[
        babyArtDefinition.Accessory.traits.length - 1
      ].traitName ||
    maxRoooool.Eyes !==
      babyArtDefinition.Eyes.traits[babyArtDefinition.Eyes.traits.length - 1]
        .traitName ||
    maxRoooool.Glasses !==
      babyArtDefinition.Glasses.traits[
        babyArtDefinition.Glasses.traits.length - 1
      ].traitName ||
    maxRoooool.Blush !==
      babyArtDefinition.Blush.traits[babyArtDefinition.Blush.traits.length - 1]
        .traitName ||
    maxRoooool.Sticker !==
      babyArtDefinition.Sticker.traits[
        babyArtDefinition.Sticker.traits.length - 1
      ].traitName ||
    maxRoooool.Cup !==
      babyArtDefinition.Cup.traits[babyArtDefinition.Cup.traits.length - 1]
        .traitName ||
    maxRoooool.Drink !==
      babyArtDefinition.Drink.traits[babyArtDefinition.Drink.traits.length - 1]
        .traitName ||
    maxRoooool.Boba !==
      babyArtDefinition.Boba.traits[babyArtDefinition.Boba.traits.length - 1]
        .traitName ||
    maxRoooool.Background !==
      babyArtDefinition.Background.traits[
        babyArtDefinition.Background.traits.length - 1
      ].traitName
  ) {
    throw new Error("max roooool wrong");
  }
};

RooooollerUnitTest();
