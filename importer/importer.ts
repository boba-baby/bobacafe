/* eslint-disable no-loop-func */
import * as fs from "fs";
import path from "path";
import gm from "gm";
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
  AccessoryTraits,
  AllAccessoryTraits,
  AllBackgroundTraits,
  AllBlushTraits,
  AllBobaTraits,
  AllCupTraits,
  AllDrinkTraits,
  AllEyesTraits,
  AllGlassesTraits,
  AllLidTraits,
  AllOverlayTraits,
  AllStickerTraits,
  AllStrawTraits,
  AllTraits,
  BackgroundTraits,
  BlushTraits,
  BobaTraits,
  CupTraits,
  DrinkTraits,
  EyesTraits,
  GlassesTraits,
  LidTraits,
  StickerTraits,
  StrawTraits,
} from "./generatedTraits";

// console.log(fs);

const babyArtDefinition: BabyArtDefinition = {
  Background: {
    traitType: "Background",
    traits: [],
  },
  Overlay: {
    traitType: "Overlay",
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

// sharp doesn't work with our 16 bit pngs, so we use gm to do this
// ... but gm is suuuper computationally heavy, so we have to do this in parallel or else my computer explodes
async function resizeWithGoodMorning(
  original: string,
  dest: string,
  dimensions: number[]
): Promise<void> {
  total += dimensions.length;
  for (const dimension of dimensions) {
    await new Promise((resolve, reject) => {
      gm(original)
        .background("transparent")
        .bitdepth(16)
        .gravity("Center")
        .extent(6000, 6000)
        .resize(dimension, dimension)
        .write(dest.replace(".png", `.${dimension}.png`), function (err) {
          if (err) reject(err);
          done++;
          console.log(`${done}/${total}`, [
            dest
              .replace(".png", `.${dimension}.png`)
              .replace("./public/layers/", ""),
            "%",
          ]);
          resolve(void 0);
        });
    });
  }
  return;
}

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

  return sharp(buffer)
    .resize({ width: 120, height: 120, fit: "inside" })
    .toFormat("png")
    .png({ palette: true, compressionLevel: 9 })
    .toFile(destWithExtension)
    .then((info) => {
      done++;
      console.log(`${done}/${total}`, [
        destWithExtension.replace("./public/layers/", ""),
        info.size,
      ]);
    });
}
// Copy the file. Skip if size is the same
async function copyAndResizeSync(
  src: string,
  tmp: string,
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
  mkdirpMemoized(tmp);

  total++;
  await fs.copyFileSync(src, tmp);
  done++;
  console.log(`${done}/${total}`, tmp);

  let all = [];
  // small images are displayed at 240x240px
  // this ensures a multiple of 4 for cleaner division
  if (isBackground) {
    all.push(resizeWithGoodMorning(tmp, dest, [6000, 2400, 960, 240]));
  } else {
    all.push(extendTo6KThenResize(tmp, dest, [2400, 960, 240]));
  }

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
    `/tmp/layers/${localPath}`,
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

// Due to the different layers, some lids like Hamster and Mouse appear above others
// So we must sort them
function sortTrait(traitType: TraitType) {
  babyArtDefinition[traitType].traits.sort((a, b) => {
    if (traitType === "Lid") {
      if (a.traitName === b.traitName) {
        return a.subTraitName!!.localeCompare(b.subTraitName!!);
      }
    }
    return a.traitName.localeCompare(b.traitName);
  });
}

sortTrait("Background");
sortTrait("Overlay");
sortTrait("Cup");
sortTrait("Drink");
sortTrait("Blush");
sortTrait("Straw");
sortTrait("Lid");
sortTrait("Eyes");
sortTrait("Boba");
sortTrait("Glasses");
sortTrait("Accessory");
sortTrait("Sticker");

function generateTsUnions() {
  let file = `import { TraitType } from "../src/IArtDef";

`;
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
      .join("\n  | ")};\n\n`;

    file += `export const ${traitType}Traits = new Set([\n${list
      .map((unquoted) => `  "${unquoted}",`)
      .join("\n")}\n]);\n${traitType === "Sticker" ? "" : "\n"}`;
  }
  file += `
export const AllTraits: Record<TraitType, Set<string>> = {
  Background: BackgroundTraits,
  Overlay: OverlayTraits,
  Cup: CupTraits,
  Drink: DrinkTraits,
  Blush: BlushTraits,
  Straw: StrawTraits,
  Lid: LidTraits,
  Eyes: EyesTraits,
  Boba: BobaTraits,
  Glasses: GlassesTraits,
  Accessory: AccessoryTraits,
  Sticker: StickerTraits,
};
`;
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

function setOverlayRarity(rarity: number, traitName: AllOverlayTraits) {
  setRarity("Overlay", rarity, traitName);
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

setBackgroundRarity(0.2, "Blue White Bokeh");
setBackgroundRarity(0.5, "Gradient Blue Purple");
setBackgroundRarity(0.2, "Gradient Dark Blue");
setBackgroundRarity(0.2, "Gradient Dark Purple");
setBackgroundRarity(0.2, "Gradient Dark Teal");
setBackgroundRarity(0.5, "Gradient Green Blue");
setBackgroundRarity(0.5, "Gradient Orange Green Teal");
setBackgroundRarity(0.5, "Gradient Orange Pink");
setBackgroundRarity(0.5, "Gradient Pink Blue");
setBackgroundRarity(0.5, "Gradient Pink Orange Green");
setBackgroundRarity(0.5, "Gradient Sunset");
setBackgroundRarity(0.5, "Gradient Yellow Green");
setBackgroundRarity(0.2, "Orange White Bokeh");
setBackgroundRarity(0.2, "Pink White Bokeh");
setBackgroundRarity(1, "Plain Blue");
setBackgroundRarity(1, "Plain Blue Gray");
setBackgroundRarity(1, "Plain Bright Orange");
setBackgroundRarity(1, "Plain Coral");
setBackgroundRarity(1, "Plain Green");
setBackgroundRarity(1, "Plain Light Teal");
setBackgroundRarity(0.5, "Plain Magenta");
setBackgroundRarity(1, "Plain Peridot");
setBackgroundRarity(1, "Plain Pink");
setBackgroundRarity(1, "Plain Purple");
setBackgroundRarity(1, "Plain Yellow");
setBackgroundRarity(0.2, "Purple Pink Bokeh");

setOverlayRarity(1, "Autumn Leaves");
setOverlayRarity(1, "Clouds");
setOverlayRarity(1, "Green Leaves");
setOverlayRarity(35, "None");
setOverlayRarity(1, "Pink Cherry Blossom Petals");
setOverlayRarity(1, "Stars");
setOverlayRarity(0.4, "Stars and Moon");
setOverlayRarity(1, "White Cherry Blossom Petals");

setCupRarity(1, "White");

setDrinkRarity(0.15, "Gradient Blue");
setDrinkRarity(0.15, "Gradient Blue Gray-Pink");
setDrinkRarity(0.15, "Gradient Blue-Pink");
setDrinkRarity(0.15, "Gradient Coral-Green");
setDrinkRarity(0.15, "Gradient Green");
setDrinkRarity(0.15, "Gradient Green-Pink");
setDrinkRarity(0.15, "Gradient Green-Purple");
setDrinkRarity(0.15, "Gradient Orange");
setDrinkRarity(0.15, "Gradient Orange-Green");
setDrinkRarity(0.15, "Gradient Pink");
setDrinkRarity(0.15, "Gradient Pink-Orange");
setDrinkRarity(0.15, "Gradient Pink-Yellow Green");
setDrinkRarity(0.15, "Gradient Purple");
setDrinkRarity(0.15, "Gradient Purple-Orange");
setDrinkRarity(0.15, "Gradient Yellow Green-Blue");
setDrinkRarity(0.15, "Solana");
setDrinkRarity(0.5, "Solid Aqua");
setDrinkRarity(1, "Solid Beige Cream");
setDrinkRarity(1, "Solid Blue");
setDrinkRarity(1, "Solid Blue Green");
setDrinkRarity(0.5, "Solid Gray Blue");
setDrinkRarity(0.5, "Solid Gray Green");
setDrinkRarity(1, "Solid Green");
setDrinkRarity(1, "Solid Green Blue");
setDrinkRarity(1, "Solid Lavender");
setDrinkRarity(1, "Solid Medium Green");
setDrinkRarity(1, "Solid Medium Purple");
setDrinkRarity(1, "Solid Orange");
setDrinkRarity(0.5, "Solid Periwinkle");
setDrinkRarity(0.5, "Solid Pink");
setDrinkRarity(1, "Solid Purple");
setDrinkRarity(1, "Solid Red");
setDrinkRarity(0.5, "Solid Wine");
setDrinkRarity(0.5, "Solid Yellow Green");

setBlushRarity(0.3, "Blue Spiral");
setBlushRarity(0.2, "Blue Star");
setBlushRarity(1, "Dark Pink Circle");
setBlushRarity(0.2, "Dark Pink Heart");
setBlushRarity(1, "Dark Pink Line");
setBlushRarity(1, "Dark Pink Oval");
setBlushRarity(0.3, "Dark Pink Spiral");
setBlushRarity(1, "Gray Spiral");
setBlushRarity(1, "Light Pink Circle");
setBlushRarity(0.2, "Light Pink Heart");
setBlushRarity(1, "Light Pink Oval");
setBlushRarity(0.3, "Light Pink Spiral");
setBlushRarity(35, "None");
setBlushRarity(1, "Orange Circle");
setBlushRarity(0.2, "Orange Heart");
setBlushRarity(1, "Orange Oval");
setBlushRarity(0.3, "Orange Spiral");
setBlushRarity(1, "Pink Circle");
setBlushRarity(1, "Pink Line");
setBlushRarity(0.2, "Pink Star");
setBlushRarity(1, "Pink Transparent Circle");
setBlushRarity(0.2, "Purple Heart");
setBlushRarity(0.3, "Purple Spiral");
setBlushRarity(0.2, "Purple Star");
setBlushRarity(1, "Purple Transparent Circle");
setBlushRarity(1, "Red Circle");
setBlushRarity(0.2, "Red Heart");
setBlushRarity(1, "Red Line");
setBlushRarity(1, "Red Oval");
setBlushRarity(0.3, "Red Spiral");
setBlushRarity(1, "Red Transparent Circle");
setBlushRarity(0.2, "Yellow Star");

setStrawRarity(0.3, "Black");
setStrawRarity(1, "Blue");
setStrawRarity(1, "Fuchsia");
setStrawRarity(1, "Green");
setStrawRarity(0.1, "None");
setStrawRarity(1, "Orange");
setStrawRarity(1, "Purple");
setStrawRarity(0.3, "Rainbow");
setStrawRarity(1, "Red");
setStrawRarity(1, "Red Orange");
setStrawRarity(0.5, "White");
setStrawRarity(1, "Yellow");

setLidRarity(0.1, "Alien-Gold");
setLidRarity(0.1, "Alien-Gray");
setLidRarity(0.1, "Alien-Green");
setLidRarity(1, "Alpaca-Beige");
setLidRarity(0.5, "Alpaca-Pink");
setLidRarity(1, "Bear-Brown");
setLidRarity(1, "Bear-Polar");
setLidRarity(1, "Bear-Purple");
setLidRarity(1, "Bear-Yellow");
setLidRarity(0.1, "Boba-Black");
setLidRarity(0.1, "Boba-White");
setLidRarity(0.3, "Bread Roll-Plain");
setLidRarity(0.3, "Bread Roll-Taro");
setLidRarity(1, "Bull-Gold Ring");
setLidRarity(0.8, "Bull-Solana");
setLidRarity(1, "Bunny-Brown");
setLidRarity(1, "Bunny-White");
setLidRarity(1, "Cat-Black Spots");
setLidRarity(1, "Cat-Brown");
setLidRarity(1, "Cat-Gray");
setLidRarity(1, "Cat-Orange Spots");
setLidRarity(1, "Cat-White");
setLidRarity(1, "Cow-Black White");
setLidRarity(1, "Cow-Brown White");
setLidRarity(0.3, "Cupcake-Blue Sprinkles");
setLidRarity(0.3, "Cupcake-Orange");
setLidRarity(0.3, "Cupcake-Pink");
setLidRarity(0.3, "Cupcake-Pink Sprinkles");
setLidRarity(0.3, "Cupcake-Purple Sprinkles");
setLidRarity(0.3, "Cupcake-Rainbow");
setLidRarity(0.1, "Dough-Blue");
setLidRarity(0.1, "Dough-Pink");
setLidRarity(0.1, "Dough-White");
setLidRarity(0.1, "Dragon-Green");
setLidRarity(0.1, "Dragon-Red");
setLidRarity(0.1, "Ghost-Pink");
setLidRarity(0.1, "Ghost-White");
setLidRarity(1, "Gorilla-Blue Gray");
setLidRarity(1, "Gorilla-Gray");
setLidRarity(1, "Hamster-Brown");
setLidRarity(1, "Hamster-Gray");
setLidRarity(1, "Hamster-Orange");
setLidRarity(1, "Horse-Brown");
setLidRarity(1, "Horse-White");
setLidRarity(0.3, "Ice Cream-Chocolate");
setLidRarity(0.3, "Ice Cream-Strawberry");
setLidRarity(0.3, "Ice Cream-Vanilla");
setLidRarity(1, "Monkey-Brown");
setLidRarity(1, "Monkey-Brown and Pink");
setLidRarity(0.1, "Moon-Rocket");
setLidRarity(1, "Mouse-Gray");
setLidRarity(1, "Mouse-White");
setLidRarity(0.3, "Nigiri-Light Pink");
setLidRarity(0.3, "Nigiri-Red Orange");
setLidRarity(0.3, "Onigiri-Black and White");
setLidRarity(0.3, "Onigiri-Flavored");
setLidRarity(1, "Otter-Ash Brown");
setLidRarity(1, "Otter-Brown");
setLidRarity(1, "Ox-Beige");
setLidRarity(0.3, "Ox-Gold");
setLidRarity(1, "Panda-Black and White");
setLidRarity(0.5, "Panda-Blue");
setLidRarity(0.5, "Panda-Pink");
setLidRarity(0.5, "Panda-Purple");
setLidRarity(1, "Pig-Gray");
setLidRarity(1, "Pig-Pink");
setLidRarity(1, "Poodle-Brown");
setLidRarity(1, "Poodle-White");
setLidRarity(0.3, "Pumpkin-Orange");
setLidRarity(0.3, "Pumpkin-White");
setLidRarity(1, "Ram-Black");
setLidRarity(1, "Ram-White");
setLidRarity(1, "Red Panda-Light Orange");
setLidRarity(1, "Red Panda-Red Orange");
setLidRarity(0.1, "Rock-Blue");
setLidRarity(0.1, "Rock-Pink");
setLidRarity(0.1, "Rock-Purple");
setLidRarity(1, "Rooster-Brown");
setLidRarity(1, "Rooster-White");
setLidRarity(0.3, "Sheep-Beige");
setLidRarity(0.1, "Sheep-Black");
setLidRarity(0.3, "Sheep-Blue");
setLidRarity(0.3, "Sheep-Brown");
setLidRarity(0.3, "Sheep-Green");
setLidRarity(0.3, "Sheep-Orange");
setLidRarity(0.1, "Sheep-Pink");
setLidRarity(0.3, "Sheep-Purple");
setLidRarity(0.3, "Sheep-Red");
setLidRarity(0.3, "Sheep-White");
setLidRarity(0.3, "Sheep-Yellow");
setLidRarity(1, "Shiba-Black");
setLidRarity(1, "Shiba-Red");
setLidRarity(1, "Snake-Green");
setLidRarity(1, "Snake-White Pink");
setLidRarity(1, "Striped Cat-Gray");
setLidRarity(1, "Striped Cat-Orange");
setLidRarity(1, "Striped Cat-Pink");
setLidRarity(0.1, "Sun-Yellow");
setLidRarity(0.1, "Sun-Yellow Orange");
setLidRarity(0.3, "Teddy Bear-Avalanche");
setLidRarity(0.5, "Teddy Bear-Black");
setLidRarity(0.5, "Teddy Bear-Dark Brown");
setLidRarity(0.3, "Teddy Bear-Ethereum");
setLidRarity(0.5, "Teddy Bear-Golden Brown");
setLidRarity(0.5, "Teddy Bear-Red Velvet");
setLidRarity(1, "Tiger-Orange");
setLidRarity(1, "Tiger-White");
setLidRarity(0.1, "Unicorn-Solana");
setLidRarity(0.1, "Unicorn-White");
setLidRarity(1, "Whale-Blue");
setLidRarity(1, "Whale-White");

setEyesRarity(0.5, "Closed U");
setEyesRarity(0.5, "Closed V");
setEyesRarity(0.1, "Dots");
setEyesRarity(0, "Huge Alien");
setEyesRarity(1, "Oval");
setEyesRarity(1, "Oval Highlighted");
setEyesRarity(1, "Oval Single Lash");
setEyesRarity(1, "Pie");
setEyesRarity(0.2, "Pink Heart");
setEyesRarity(0.2, "Pink Heart Polka Dot");
setEyesRarity(0.2, "Red Heart");
setEyesRarity(1, "Relaxed");
setEyesRarity(1, "Round Bottom Lash");
setEyesRarity(1, "Round Double Lash");
setEyesRarity(1, "Round Highlighted");
setEyesRarity(1, "Round Single Lash");
setEyesRarity(1, "Round Top Lash");
setEyesRarity(0.5, "Round Top Lash Wink");
setEyesRarity(0.5, "Round Wink");
setEyesRarity(0.5, "Sparkly");
setEyesRarity(0.5, "Sparkly Bottom Lash");
setEyesRarity(0.5, "Sparkly Double Lash");
setEyesRarity(0.2, "Sparkly Double Lash Wink");
setEyesRarity(0.5, "Sparkly Single Lash");
setEyesRarity(0.5, "Sparkly Top Lash");
setEyesRarity(0.5, "Sparkly Wink");
setEyesRarity(0.2, "Spiral");
setEyesRarity(0.2, "Star Eyes");

setBobaRarity(0.2, "All Hearts");
setBobaRarity(1, "Bears Boba");
setBobaRarity(1, "Cats Boba");
setBobaRarity(1, "Green Apple Boba");
setBobaRarity(1, "Half Cup Round Boba");
setBobaRarity(0.4, "Hearts and Stars");
setBobaRarity(0.4, "Hearts and Stars Partial");
setBobaRarity(0.4, "Hearts Partial");
setBobaRarity(0.4, "Lychee Boba");
setBobaRarity(0.2, "None");
setBobaRarity(1, "Pineapple Boba");
setBobaRarity(0.1, "Shaken Boba");
setBobaRarity(1, "Solana Boba");
setBobaRarity(1, "Stars Boba");
setBobaRarity(1, "Stars Partial");
setBobaRarity(1, "Strawberry Boba");
setBobaRarity(1, "Third Cup Round Black");
setBobaRarity(1, "Three Rows Boba");

setGlassesRarity(1, "AR Glasses");
setGlassesRarity(0.2, "Blue Clear");
setGlassesRarity(1, "Gold Round Eyeglasses");
setGlassesRarity(1, "Gray Round Sunglasses");
setGlassesRarity(0.5, "Green Flower Sunglasses");
setGlassesRarity(1, "Green Round Sunglasses");
setGlassesRarity(0.1, "Monocle");
setGlassesRarity(25, "None");
setGlassesRarity(0.5, "Orange Flower Sunglasses");
setGlassesRarity(1, "Orange Round Sunglasses");
setGlassesRarity(1, "Pink Heart Sunglasses");
setGlassesRarity(0.3, "Pit Vipers Solana");
setGlassesRarity(1, "Purple Gradient Heart Sunglasses");
setGlassesRarity(1, "Purple Round Sunglasses");
setGlassesRarity(1, "Silver Round Eyeglasses");
setGlassesRarity(0.2, "Solana Heart Sunglasses");
setGlassesRarity(0.2, "VR HL3");
setGlassesRarity(0.2, "VR Ultrawide");
setGlassesRarity(1, "Yellow Round Sunglasses");

setAccessoryRarity(0.1, "Angel Wings");
setAccessoryRarity(0.1, "Bee");
setAccessoryRarity(1, "Blue Bow");
setAccessoryRarity(0.3, "Butterfly");
setAccessoryRarity(0.3, "Candy");
setAccessoryRarity(1, "Cherry Blossom");
setAccessoryRarity(0.1, "Clover");
setAccessoryRarity(0.1, "Crown");
setAccessoryRarity(0.3, "Crown Jewel");
setAccessoryRarity(0.1, "Daisy");
setAccessoryRarity(0.5, "Dango");
setAccessoryRarity(1, "Double Bows");
setAccessoryRarity(1, "Double Pink Cherry");
setAccessoryRarity(0.1, "Double Red Cherry");
setAccessoryRarity(0.1, "Enchanted Golden Apple");
setAccessoryRarity(1, "Flower Stem");
setAccessoryRarity(0.3, "Golden Apple");
setAccessoryRarity(0.3, "GPU Drink");
setAccessoryRarity(1, "Green Apple");
setAccessoryRarity(1, "Heart Antenna");
setAccessoryRarity(1, "Leaf");
setAccessoryRarity(35, "None");
setAccessoryRarity(1, "Pink Bow");
setAccessoryRarity(1, "Pink Cherry");
setAccessoryRarity(0.3, "Pink Cherry Double");
setAccessoryRarity(0.5, "Pink Rose Head");
setAccessoryRarity(0.5, "Pink Strawberry");
setAccessoryRarity(1, "Plain Antenna");
setAccessoryRarity(1, "Plant Stem");
setAccessoryRarity(0.5, "Pom Poms");
setAccessoryRarity(1, "Purple Bow");
setAccessoryRarity(1, "Red Apple");
setAccessoryRarity(1, "Red Bow");
setAccessoryRarity(1, "Red Cherry");
setAccessoryRarity(1, "Red Rose");
setAccessoryRarity(1, "Red Rose Head");
setAccessoryRarity(1, "Red Strawberry");
setAccessoryRarity(0.1, "Snail");
setAccessoryRarity(1, "Solana Bow");
setAccessoryRarity(0.1, "Sparkles");
setAccessoryRarity(1, "Star Antenna");
setAccessoryRarity(0.5, "Whale Drink");
setAccessoryRarity(1, "White Bow");
setAccessoryRarity(0.5, "Yellow Rose Head");

setStickerRarity(1, "Bandaid");
setStickerRarity(1, "Boba Cup");
setStickerRarity(0.4, "BTC");
setStickerRarity(1, "Cactus");
setStickerRarity(1, "Cake");
setStickerRarity(1, "Coffee");
setStickerRarity(0.1, "Diamond");
setStickerRarity(0.1, "Dinosaur");
setStickerRarity(0.1, "Doge");
setStickerRarity(1, "Flower");
setStickerRarity(0.4, "Frog");
setStickerRarity(0.2, "gm");
setStickerRarity(0.2, "gn");
setStickerRarity(0.1, "GPU");
setStickerRarity(0.4, "Hamburger");
setStickerRarity(1, "Heart Forehead Sticker");
setStickerRarity(0.4, "Ice Cream Cone");
setStickerRarity(0.2, "ily");
setStickerRarity(0.2, "Moon");
setStickerRarity(0.4, "Mushroom");
setStickerRarity(1, "Music Note");
setStickerRarity(0.2, "ngmi");
setStickerRarity(0.4, "ngu");
setStickerRarity(50, "None");
setStickerRarity(1, "Pink Heart");
setStickerRarity(0.4, "Pizza");
setStickerRarity(0.4, "Pumpkin");
setStickerRarity(0.2, "Rainbow");
setStickerRarity(1, "Red Heart");
setStickerRarity(0.4, "Rocket");
setStickerRarity(1, "Shaka");
setStickerRarity(0.1, "Solana");
setStickerRarity(1, "Star");
setStickerRarity(1, "Star Forehead Sticker");
setStickerRarity(1, "Tea");
setStickerRarity(0.1, "Unicorn");
setStickerRarity(0.4, "wagmi");
setStickerRarity(1, "Waves");
setStickerRarity(0.2, "Whale");

const table: Record<
  string,
  {
    "None %": number;
    "Common %": number;
    "Rare %": number;
    "Ultra Rare %": number;
  }
> = {};

function calculateRarityNameAndPercent() {
  for (const traitType of allTraitTypes) {
    let totalWeight = 0;

    let thresholdR = 0.6;
    let thresholdUR = 0.26;

    if (traitType === "Lid") {
      thresholdR = 0.79;
      thresholdUR = 0.11;
    } else if (traitType === "Accessory") {
      thresholdR = 1.2;
      thresholdUR = 0.35;
    } else if (traitType === "Background") {
    } else if (traitType === "Overlay") {
      thresholdR = 1.2;
      thresholdUR = 0.99;
    } else if (traitType === "Blush") {
      thresholdR = 1.2;
      thresholdUR = 0.35;
    } else if (traitType === "Boba") {
    } else if (traitType === "Cup") {
    } else if (traitType === "Drink") {
    } else if (traitType === "Eyes") {
    } else if (traitType === "Glasses") {
      thresholdR = 1.2;
      thresholdUR = 0.55;
    } else if (traitType === "Sticker") {
      thresholdR = 1.2;
      thresholdUR = 0.45;
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

      if (
        trait.traitName.match(/^Secret/) ||
        (trait.subTraitName && trait.subTraitName.match(/^Secret/))
      ) {
        console.log(trait);
        throw new Error("Secret rarity disabled. ");
      }

      if (trait.rarity < thresholdUR) {
        if (
          trait.traitName.match(/^Secret/) ||
          (trait.subTraitName && trait.subTraitName.match(/^Secret/))
        ) {
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
    table[traitType] = {
      "None %": Math.round((10000 * weightFromNone) / totalWeight) / 100,
      "Common %": Math.round((10000 * weightFromC) / totalWeight) / 100,
      "Rare %": Math.round((10000 * weightFromR) / totalWeight) / 100,
      "Ultra Rare %": Math.round((10000 * weightFromUR) / totalWeight) / 100,
    };
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

function printRaritySetter(traitType: TraitType) {
  console.log("");

  const traits = Array.from(AllTraits[traitType]);
  traits.forEach((traitName) => {
    let foundTrait: Trait | undefined;

    if (traitType === "Lid") {
      foundTrait = babyArtDefinition[traitType].traits.find(
        (trait) =>
          trait.traitName === traitName.split("-")[0] &&
          trait.subTraitName === traitName.split("-")[1]
      );
    } else {
      foundTrait = babyArtDefinition[traitType].traits.find(
        (trait) => trait.traitName === traitName
      );
    }

    if (foundTrait === undefined) {
      throw new Error("Undefined trait " + traitName);
    }

    console.log(`set${traitType}Rarity(${foundTrait.rarity}, "${traitName}");`);
  });
}

printRaritySetter("Background");
printRaritySetter("Overlay");
printRaritySetter("Cup");
printRaritySetter("Drink");
printRaritySetter("Blush");
printRaritySetter("Straw");
printRaritySetter("Lid");
printRaritySetter("Eyes");
printRaritySetter("Boba");
printRaritySetter("Glasses");
printRaritySetter("Accessory");
printRaritySetter("Sticker");

// console.dir(babyArtDefinition, { depth: null });

console.table(table);

fs.writeFileSync(
  "./src/babyArtDefinition.json",
  JSON.stringify(babyArtDefinition, null, 2)
);
console.log("Wrote json", JSON.stringify(babyArtDefinition).length);
