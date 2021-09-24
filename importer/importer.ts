/* eslint-disable no-loop-func */
import * as fs from "fs";
import path from "path";
import sharp from "sharp";

import { sync as mkdirpSync } from "mkdirp";
import {
  allTraitTypes,
  BabyArtDefinition,
  Layer,
  Trait,
  TraitCategory,
  TraitType,
} from "../src/IArtDef";
import {
  AllAccessoryTraits,
  AllBackgroundTraits,
  AllBlushTraits,
  AllBobaTraits,
  AllCupTraits,
  AllDrinkTraits,
  AllEyesTraits,
  AllGlassesTraits,
  AllLidTraits,
  AllStickerTraits,
  AllStrawTraits,
} from "./generatedTraits";

// console.log(fs);

const babyArtDefinition: BabyArtDefinition = {
  Background: {
    traitType: "Background",
    traits: [],
  },
  Cup: {
    traitType: "Cup",
    traits: [],
  },
  Drink: {
    traitType: "Drink",
    traits: [],
  },
  Blush: {
    traitType: "Blush",
    traits: [],
  },
  Straw: {
    traitType: "Straw",
    traits: [],
  },
  Lid: {
    traitType: "Lid",
    traits: [],
  },
  Eyes: {
    traitType: "Eyes",
    traits: [],
  },
  Boba: {
    traitType: "Boba",
    traits: [],
  },
  Glasses: {
    traitType: "Glasses",
    traits: [],
  },
  Accessory: {
    traitType: "Accessory",
    traits: [],
  },
  Sticker: {
    traitType: "Sticker",
    traits: [],
  },
};

let sourcePNGs = "/Volumes/GoogleDrive/My Drive/Source PNGs";
let usingPublicLayers = false;
if (!fs.existsSync(sourcePNGs)) {
  sourcePNGs = "./public/layers";
  usingPublicLayers = true;
  console.log(
    `\n\n\n\n\nSource PNGs doesnt exist on this computer (if you are reading this, you are probably a community member ❤️  ). In the future, this script will gracefully degrade. Meanwhile, please see babyArtDefinition.json and IArtDef.ts.\n\n\n\n\n`
  );
  process.exit();
}

const folders = fs.readdirSync(sourcePNGs);

const mkdirred = new Set<string>();
function mkdirpMemoized(localPath: string) {
  const folderPath = path.dirname(localPath);
  // console.log("Mkdirping", folderPath);
  if (!mkdirred.has(folderPath)) {
    try {
      mkdirpSync(folderPath);
    } catch (e) {}
  }
  mkdirred.add(folderPath);
}

let done = 0;
let total = 0;

// If resizing to less than 400x400, it is used as a progressive loader, so we use
// palette for smaller file size
// 6k dimension is implicit
async function extendTo6KThenResize(
  original: string,
  dest: string,
  dimensions: number[]
) {
  const image = sharp(original);
  total += dimensions.length + 1;

  const metadata = await image.metadata();

  const srcStat = await fs.statSync(original);

  const originalSize = srcStat.size;
  if (!metadata.width || !metadata.height || originalSize === undefined) {
    console.log("Returned:", metadata.width, metadata.height, originalSize);
    return Promise.resolve();
  }
  // if (metadata.width < 5000 || metadata.height < 5000) {
  //   console.log(`Error: File is less than 5kx5k ${original}`);
  //   return Promise.resolve();
  // }

  const sixKayDest = dest.replace(".png", `.6000.png`);

  const sixKayInfo = await sharp(original)
    .extend({
      left: (6000 - metadata.width) / 2,
      right: (6000 - metadata.width) / 2,
      top: (6000 - metadata.height) / 2,
      bottom: (6000 - metadata.height) / 2,
      background: {
        r: 255,
        g: 255,
        b: 255,
        alpha: 0,
      },
    })
    .toFormat("png")
    .png({
      palette: false,
      compressionLevel: 9,
      adaptiveFiltering: true,
      force: true,
    })
    .toFile(sixKayDest);
  done++;
  console.log(`${done}/${total}`, [
    sixKayDest.replace("./public/layers/", ""),
    Math.round((10000 * sixKayInfo.size) / originalSize) / 100 + "%",
  ]);

  const all: Promise<void>[] = [];

  for (const dimension of dimensions) {
    all.push(
      sharp(sixKayDest)
        .resize(dimension, dimension)
        .toFormat("png")
        .png(
          dimension < 400
            ? { palette: true, compressionLevel: 9 }
            : { palette: false, compressionLevel: 9 }
        )
        .toFile(dest.replace(".png", `.${dimension}.png`))
        .then((info) => {
          done++;
          console.log(`${done}/${total}`, [
            dest
              .replace(".png", `.${dimension}.png`)
              .replace("./public/layers/", ""),
            Math.round((10000 * info.size) / originalSize) / 100,
            "%",
          ]);
        })
    );
  }
  return await Promise.all(all);
}
async function createThumbnail(src: string, dest: string) {
  const destWithExtension = dest.replace(".png", `.thumb.png`);
  total++;

  // Trim before doing any resizes
  let buffer = await sharp(src).toBuffer();

  try {
    // Some files (like single color images) can't be trimmed, so we just do a simple resize and save
    buffer = await sharp(buffer).trim(1).toBuffer();
  } catch (e) {}

  return (
    sharp(buffer)
      .resize({ width: 120, height: 120, fit: "inside" })
      .toFormat("png")
      .png({ palette: true, compressionLevel: 9 })
      // .png({ palette: true })
      .toFile(destWithExtension)
      .then((info) => {
        done++;
        console.log(`${done}/${total}`, [
          destWithExtension.replace("./public/layers/", ""),
          info.size,
        ]);
      })
  );
}
// Copy the file. Skip if size is the same
function copyAndResizeSync(
  src: string,
  original: string,
  dest: string,
  isBackground: boolean
) {
  if (!fs.existsSync(src)) {
    throw new Error(`File ${src} doesnt exist`);
  }

  if (fs.existsSync(original)) {
    try {
      const srcStat = fs.statSync(src);
      const originalStat = fs.statSync(original);

      if (srcStat.size === originalStat.size) {
        return; // size is the same as original, so probably the same file
      }
      fs.rmSync(dest);
    } catch (e) {}
  }
  mkdirpMemoized(dest);
  mkdirpMemoized(original);

  let all = [];
  // small images are displayed at 240x240px
  // this ensures a multiple of 4 for cleaner division
  all.push(extendTo6KThenResize(src, dest, [2400, 960, 240]));

  all.push(createThumbnail(src, dest));

  total++;

  Promise.all(all).then(() => {
    fs.copyFile(src, original, () => {
      done++;
      console.log(`${done}/${total}`, [original]);
    });
  });
}

function processFile(
  zIndex: number,
  layerName: string,
  localPath: string,
  traitName: string,
  subTraitName: string | undefined
) {
  let category = layerName;
  if (layerName === "Bottom Straw" || layerName === "Top Straw") {
    category = "Straw";
  }

  // @ts-ignore
  const traitCategory: TraitCategory | undefined = babyArtDefinition[
    category
  ] as TraitCategory;
  if (traitCategory === undefined) {
    throw new Error(`Category ${category} not found`);
  }

  const layer: Layer = { zIndex: zIndex, fileName: localPath };

  let existingFound = false;
  for (const existingTrait of traitCategory.traits) {
    if (
      existingTrait.traitName === traitName &&
      existingTrait.subTraitName === subTraitName
    ) {
      existingFound = true;
      existingTrait.layers.push(layer);
      break;
    }
  }
  if (!existingFound) {
    const trait: Trait = {
      traitName: traitName,
      subTraitName: subTraitName,
      rarity: 1,
      rarityName: "Common",
      rarityFrequency: 100,
      layers: [layer],
    };
    traitCategory.traits.push(trait);
  }

  // console.log(localPath);
  copyAndResizeSync(
    `${sourcePNGs}/${localPath}`,
    `./originals/layers/${localPath}`,
    `./public/layers/${localPath}`,
    layerName === "Background"
  );
}

for (const folder of folders) {
  if (fs.lstatSync(`${sourcePNGs}/${folder}`).isDirectory()) {
    if (!folder.includes("-")) {
      throw new Error(`Invalid. Folder missing - ${folder}`);
    }

    const [heightString, layerName] = folder.split("-");
    const zIndex = Number(heightString);

    const files = fs.readdirSync(`${sourcePNGs}/${folder}/`);

    const suffixWanted = usingPublicLayers ? ".6000.png" : ".png";
    for (const traitFileName of files) {
      if (traitFileName.endsWith(suffixWanted)) {
        let trait = traitFileName.replace(/.png$/, "");
        if (usingPublicLayers) {
          trait = traitFileName.replace(/6000.png$/, "");
        }
        let subTrait: string | undefined = undefined;

        // Lid is the only one with a subtrait
        if (folder.includes("Lid")) {
          if (!trait.includes("-")) {
            throw new Error(`Missing hyphen in ${trait}`);
          }

          const splitTrait = trait.split("-");

          trait = splitTrait[0];
          subTrait = splitTrait[1];
        }

        processFile(
          zIndex,
          layerName,
          `${folder}/${traitFileName}`,
          trait,
          subTrait
        );
      } else {
        // console.error(`Ignored ${traitFileName}`);
      }
    }
  }
}

function generateTsUnions() {
  let file = "";
  for (const traitType of allTraitTypes) {
    const list = [];
    for (const trait of babyArtDefinition[traitType].traits) {
      if (traitType === "Lid") {
        list.push(`${trait.traitName}-${trait.subTraitName}`);
      } else {
        list.push(trait.traitName);
      }
    }

    file += `export type All${traitType}Traits = \n  | ${list
      .map((unquoted) => `"${unquoted}"`)
      .join("\n  | ")};\n${traitType === "Sticker" ? "" : "\n"}`;
  }
  fs.writeFileSync("./importer/generatedTraits.ts", file);
}
generateTsUnions();

function setRarity(
  traitType: TraitType,
  rarity: number,
  traitName: string,
  subTraitName?: string
) {
  const category = babyArtDefinition[traitType];
  for (const trait of category.traits) {
    if (trait.traitName === traitName && trait.subTraitName === subTraitName) {
      trait.rarity = rarity;
      return;
    }
  }

  throw new Error(
    `Couldnt find ${traitType}: "${traitName}" - "${subTraitName}"`
  );
}

function setBackgroundRarity(rarity: number, traitName: AllBackgroundTraits) {
  setRarity("Background", rarity, traitName);
}

function setCupRarity(rarity: number, traitName: AllCupTraits) {
  setRarity("Cup", rarity, traitName);
}

function setDrinkRarity(rarity: number, traitName: AllDrinkTraits) {
  setRarity("Drink", rarity, traitName);
}

function setBlushRarity(rarity: number, traitName: AllBlushTraits) {
  setRarity("Blush", rarity, traitName);
}

function setStrawRarity(rarity: number, traitName: AllStrawTraits) {
  setRarity("Straw", rarity, traitName);
}

function setLidRarity(rarity: number, traitNameCompound: AllLidTraits) {
  setRarity(
    "Lid",
    rarity,
    traitNameCompound.split("-")[0],
    traitNameCompound.split("-")[1]
  );
}

function setEyesRarity(rarity: number, traitName: AllEyesTraits) {
  setRarity("Eyes", rarity, traitName);
}

function setBobaRarity(rarity: number, traitName: AllBobaTraits) {
  setRarity("Boba", rarity, traitName);
}

function setGlassesRarity(rarity: number, traitName: AllGlassesTraits) {
  setRarity("Glasses", rarity, traitName);
}

function setAccessoryRarity(rarity: number, traitName: AllAccessoryTraits) {
  setRarity("Accessory", rarity, traitName);
}

function setStickerRarity(rarity: number, traitName: AllStickerTraits) {
  setRarity("Sticker", rarity, traitName);
}

setLidRarity(0.3, "Cupcake-Blue Sprinkles");
setLidRarity(0.3, "Cupcake-Orange");
setLidRarity(0.3, "Cupcake-Pink Sprinkles");
setLidRarity(0.3, "Cupcake-Pink");
setLidRarity(0.3, "Cupcake-Purple Sprinkles");
setLidRarity(0.1, "Cupcake-Rainbow");
setLidRarity(0.5, "Ice Cream-Chocolate");
setLidRarity(0.5, "Ice Cream-Strawberry");
setLidRarity(0.5, "Ice Cream-Vanilla");
setLidRarity(0.5, "Nigiri-Light Pink");
setLidRarity(0.5, "Nigiri-Red Orange");
setLidRarity(0.5, "Onigiri-Black and White");
setLidRarity(0.5, "Onigiri-Flavored");
setLidRarity(0.1, "Secret.01-A");
setLidRarity(0.1, "Secret.01-B");

setBackgroundRarity(0.25, "Blue Pink Clouds");
setBackgroundRarity(0.5, "Blue White Bokeh");
setBackgroundRarity(0.5, "Orange White Bokeh");
setBackgroundRarity(0.5, "Pink White Bokeh");
setBackgroundRarity(0.5, "Purple Pink Bokeh");

setCupRarity(0.003, "Invisible");
setCupRarity(0.003, "Opaque White");

setDrinkRarity(0.5, "Gradient Blue-Pink");

setBlushRarity(0.5, "Blue Spiral");
setBlushRarity(0.1, "Blue Star");
setBlushRarity(1, "Dark Pink Circle");
setBlushRarity(0.2, "Dark Pink Heart");
setBlushRarity(1, "Dark Pink Line");
setBlushRarity(1, "Dark Pink Oval");
setBlushRarity(0.5, "Dark Pink Spiral");
setBlushRarity(1, "Gray Spiral");
setBlushRarity(1, "Light Pink Circle");
setBlushRarity(0.2, "Light Pink Heart");
setBlushRarity(1, "Light Pink Oval");
setBlushRarity(0.5, "Light Pink Spiral");
setBlushRarity(10, "None");
setBlushRarity(1, "Orange Circle");
setBlushRarity(0.2, "Orange Heart");
setBlushRarity(1, "Orange Oval");
setBlushRarity(0.5, "Orange Spiral");
setBlushRarity(1, "Pink Circle");
setBlushRarity(1, "Pink Line");
setBlushRarity(0.1, "Pink Star");
setBlushRarity(1, "Pink Transparent Circle");
setBlushRarity(0.2, "Purple Heart");
setBlushRarity(0.5, "Purple Spiral");
setBlushRarity(0.1, "Purple Star");
setBlushRarity(1, "Purple Transparent Circle");
setBlushRarity(1, "Red Circle");
setBlushRarity(0.2, "Red Heart");
setBlushRarity(1, "Red Line");
setBlushRarity(1, "Red Oval");
setBlushRarity(0.5, "Red Spiral");
setBlushRarity(1, "Red Transparent Circle");
setBlushRarity(0.1, "Yellow Star");

setStrawRarity(0.3, "Rainbow");

setEyesRarity(0.2, "Closed U");
setEyesRarity(0.2, "Closed V");
setEyesRarity(1, "Oval Highlighted");
setEyesRarity(1, "Oval Single Lash");
setEyesRarity(1, "Oval");
setEyesRarity(1, "Pie");
setEyesRarity(0.2, "Pink Heart Polka Dot");
setEyesRarity(0.2, "Pink Heart");
setEyesRarity(0.2, "Red Heart");
setEyesRarity(1, "Relaxed");
setEyesRarity(1, "Round Bottom Lash");
setEyesRarity(1, "Round Double Lash");
setEyesRarity(1, "Round Highlighted");
setEyesRarity(1, "Round Single Lash");
setEyesRarity(0.1, "Round Top Lash Wink");
setEyesRarity(1, "Round Top Lash");
setEyesRarity(0.1, "Round Wink");
setEyesRarity(0.5, "Sparkly Bottom Lash");
setEyesRarity(0.1, "Sparkly Double Lash Wink");
setEyesRarity(0.5, "Sparkly Double Lash");
setEyesRarity(0.5, "Sparkly Single Lash");
setEyesRarity(0.5, "Sparkly Top Lash");
setEyesRarity(0.1, "Sparkly Wink");
setEyesRarity(0.5, "Sparkly");
setEyesRarity(1, "Spiral");

setBobaRarity(0.2, "All Hearts");
setBobaRarity(1, "Half Cup Round Boba");
setBobaRarity(0.4, "Hearts Partial");
setBobaRarity(0.4, "Hearts and Stars Partial");
setBobaRarity(0.4, "Hearts and Stars");
setBobaRarity(0.2, "None");
setBobaRarity(0.1, "Shaken Boba");
setBobaRarity(1, "Stars Partial");
setBobaRarity(1, "Third Cup Round Black");
setBobaRarity(1, "Three Rows Boba");

setGlassesRarity(0.2, "Blue Clear");
setGlassesRarity(1, "Gold Round Eyeglasses");
setGlassesRarity(1, "Gray Round Sunglasses");
setGlassesRarity(0.5, "Green Flower Sunglasses");
setGlassesRarity(1, "Green Round Sunglasses");
setGlassesRarity(0.1, "Monocle");
setGlassesRarity(20, "None");
setGlassesRarity(0.5, "Orange Flower Sunglasses");
setGlassesRarity(1, "Orange Round Sunglasses");
setGlassesRarity(1, "Pink Heart Sunglasses");
setGlassesRarity(1, "Purple Gradient Heart Sunglasses");
setGlassesRarity(1, "Purple Round Sunglasses");
setGlassesRarity(1, "Silver Round Eyeglasses");
setGlassesRarity(0.1, "Solana Heart Sunglasses");
setGlassesRarity(1, "Yellow Round Sunglasses");

setAccessoryRarity(0.1, "Bee");
setAccessoryRarity(1, "Blue Bow");
setAccessoryRarity(0.2, "Butterfly");
setAccessoryRarity(0.2, "Candy");
setAccessoryRarity(1, "Cherry Blossom");
setAccessoryRarity(0.1, "Clover");
setAccessoryRarity(0.2, "Crown Jewel");
setAccessoryRarity(0.1, "Crown");
setAccessoryRarity(0.1, "Daisy");
setAccessoryRarity(0.5, "Dango");
setAccessoryRarity(1, "Double Bows");
setAccessoryRarity(0.1, "Double Red Cherry");
setAccessoryRarity(0.1, "Enchanted Golden Apple");
setAccessoryRarity(1, "Flower Stem");
setAccessoryRarity(0.2, "Golden Apple");
setAccessoryRarity(1, "Green Apple");
setAccessoryRarity(1, "Heart Antenna");
setAccessoryRarity(1, "Leaf");
setAccessoryRarity(30, "None");
setAccessoryRarity(1, "Pink Bow");
setAccessoryRarity(0.2, "Pink Cherry Double");
setAccessoryRarity(1, "Pink Cherry");
setAccessoryRarity(0.5, "Pink Rose Head");
setAccessoryRarity(0.5, "Pink Strawberry");
setAccessoryRarity(1, "Plain Antenna");
setAccessoryRarity(1, "Plant Stem");
setAccessoryRarity(0.5, "Pom Poms");
setAccessoryRarity(1, "Purple Bow");
setAccessoryRarity(1, "Red Apple");
setAccessoryRarity(1, "Red Bow");
setAccessoryRarity(1, "Red Cherry");
setAccessoryRarity(1, "Red Rose Head");
setAccessoryRarity(1, "Red Rose");
setAccessoryRarity(1, "Red Strawberry");
setAccessoryRarity(0.1, "Snail");
setAccessoryRarity(0.1, "Sparkles");
setAccessoryRarity(1, "Star Antenna");
setAccessoryRarity(1, "White Bow");
setAccessoryRarity(0.5, "Yellow Rose Head");
setAccessoryRarity(0.1, "Secret.01");

setStickerRarity(0.5, "BTC");
setStickerRarity(1, "Bandaid");
setStickerRarity(1, "Boba Cup");
setStickerRarity(1, "Cactus");
setStickerRarity(1, "Cake");
setStickerRarity(1, "Coffee");
setStickerRarity(0.1, "Diamond");
setStickerRarity(0.1, "Doge");
setStickerRarity(1, "Flower");
setStickerRarity(0.5, "Frog");
setStickerRarity(0.5, "Hamburger");
setStickerRarity(1, "Heart Forehead Sticker");
setStickerRarity(0.5, "Ice Cream Cone");
setStickerRarity(0.5, "Mushroom");
setStickerRarity(1, "Music Note");
setStickerRarity(50, "None");
setStickerRarity(1, "Pink Heart");
setStickerRarity(0.5, "Pizza");
setStickerRarity(0.5, "Pumpkin");
setStickerRarity(0.2, "Rainbow");
setStickerRarity(1, "Red Heart");
setStickerRarity(0.5, "Rocket");
setStickerRarity(1, "Shaka");
setStickerRarity(0.1, "Solana");
setStickerRarity(1, "Star Forehead Sticker");
setStickerRarity(1, "Star");
setStickerRarity(1, "Tea");
setStickerRarity(0.1, "Unicorn");
setStickerRarity(1, "Waves");
setStickerRarity(0.2, "Whale");
setStickerRarity(0.2, "gm");
setStickerRarity(0.2, "gn");
setStickerRarity(0.2, "ily");

function calculateRarityNameAndPercent() {
  for (const traitType of allTraitTypes) {
    let totalWeight = 0;

    let thresholdR = 0.6;
    let thresholdUR = 0.26;

    if (traitType === "Lid") {
      thresholdR = 0.9;
      thresholdUR = 0.11;
    } else if (traitType === "Accessory") {
      thresholdR = 1.2;
      thresholdUR = 0.25;
    } else if (traitType === "Background") {
    } else if (traitType === "Blush") {
    } else if (traitType === "Boba") {
    } else if (traitType === "Cup") {
    } else if (traitType === "Drink") {
    } else if (traitType === "Eyes") {
    } else if (traitType === "Glasses") {
      thresholdR = 1.2;
      thresholdUR = 0.55;
    } else if (traitType === "Sticker") {
    } else if (traitType === "Straw") {
    }

    let weightFromNone = 0;
    let weightFromC = 0;
    let weightFromR = 0;
    let weightFromUR = 0;
    let weightFromSR = 0;

    for (const trait of babyArtDefinition[traitType].traits) {
      totalWeight += trait.rarity;
    }
    for (const trait of babyArtDefinition[traitType].traits) {
      trait.rarityFrequency = trait.rarity / totalWeight;

      if (trait.traitName === "None") {
        weightFromNone += trait.rarity;
      }
      if (trait.traitName.match(/Secret\.[0-9][0-9]/)) {
        if (trait.rarity > thresholdUR) {
          console.log(
            `Secret rares must be UR rarity ${traitType} "${trait.traitName}" Rarity: ${trait.rarity}`
          );
        }
      }

      if (trait.rarity < thresholdUR) {
        if (trait.traitName.match(/Secret\.[0-9][0-9]/)) {
          // console.log("Matched", trait);

          trait.rarityName = "Secret Rare";

          weightFromSR += trait.rarity;
        } else {
          trait.rarityName = "Ultra Rare";
          weightFromUR += trait.rarity;
        }
      } else if (trait.rarity < thresholdR) {
        trait.rarityName = "Rare";
        weightFromR += trait.rarity;
      } else {
        trait.rarityName = "Common";
        weightFromC += trait.rarity;
      }
    }

    console.log();
    console.log(traitType);
    if (weightFromNone) {
      console.log(
        "         None %:" +
          (Math.round((10000 * weightFromNone) / totalWeight) / 100 < 10
            ? " "
            : ""),
        Math.round((10000 * weightFromNone) / totalWeight) / 100
      );
    }
    console.log(
      "       Common %:",
      Math.round((10000 * weightFromC) / totalWeight) / 100
    );
    console.log(
      "         Rare %:" +
        (Math.round((10000 * weightFromR) / totalWeight) / 100 < 10 ? " " : ""),
      Math.round((10000 * weightFromR) / totalWeight) / 100
    );
    console.log(
      "   Ultra Rare %:" +
        (Math.round((10000 * weightFromUR) / totalWeight) / 100 < 10
          ? " "
          : ""),
      Math.round((10000 * weightFromUR) / totalWeight) / 100
    );
    if (weightFromSR) {
      console.log(
        "  Secret Rare %:" +
          (Math.round((10000 * weightFromSR) / totalWeight) / 100 < 10
            ? " "
            : ""),
        Math.round((10000 * weightFromSR) / totalWeight) / 100
      );
    }

    if (weightFromC / totalWeight < 0.5) {
      console.log("Not enough common", traitType);
    }
    if (weightFromR / totalWeight > 0.4) {
      console.log("Too much rare", traitType);
    }
  }
}
calculateRarityNameAndPercent();

// console.dir(babyArtDefinition, { depth: null });

fs.writeFileSync(
  "./src/babyArtDefinition.json",
  JSON.stringify(babyArtDefinition, null, 2)
);
console.log("Wrote json", JSON.stringify(babyArtDefinition).length);
