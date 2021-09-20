/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { jsx, css } from "@emotion/react";
import { BobaBabyCanvas } from "./BobaBabyCanvas";
import {
  generateLoadedRandom,
  pullAtOdds,
  pullAtUniform,
  pullAtUniformWithExclude,
  pullAtUniformWithMoreNoneChance,
  pullLidAtUniform,
  pullLidVariationAtUniform,
} from "./randomUtils";
import { FullBobaBaby, TraitTuple, TraitType } from "../IArtDef";
import { traitFinder } from "./traitFinder";
import useIntersectionObserver from "@react-hook/intersection-observer";

const initialBaby = generateLoadedRandom();

// Lids are coool
export const loadedAllTraitTypes: TraitType[] = [
  // Since it is transparent, don't try to roll any backgrounds
  // "Background",
  // "Background",
  "Cup",
  "Drink",
  "Drink",
  "Blush",
  "Blush",
  "Straw",
  "Straw",
  "Lid",
  "Lid",
  "Lid",
  "Lid",
  "Lid",
  "Lid",
  "Lid",
  "Eyes",
  "Eyes",
  "Boba",
  "Boba",
  "Glasses",
  "Glasses",
  "Accessory",
  "Sticker",
];
export const nonLidTypes: TraitType[] = [
  "Background",
  "Cup",
  "Drink",
  "Blush",
  "Straw",
  "Eyes",
  "Boba",
  "Glasses",
  "Accessory",
  "Sticker",
];

// Don't show duplicates
const isDuplicate = (
  traitTuple: TraitTuple,
  existingNextTraits: TraitTuple[]
) => {
  for (const existingTrait of existingNextTraits) {
    if (
      existingTrait.traitType === traitTuple.traitType &&
      existingTrait.trait.traitName === traitTuple.trait.traitName &&
      existingTrait.trait.subTraitName === traitTuple.trait.subTraitName
    ) {
      return true;
    }
  }
  return false;
};

const pickRandomTraitForType = (
  traitType: TraitType,

  lidForVariation?: string // if not undefined, will pick based on that trait name
): TraitTuple => {
  if (traitType === "Lid") {
    if (lidForVariation) {
      return {
        traitType: "Lid",
        trait: pullLidVariationAtUniform(lidForVariation),
      };
    } else {
      return {
        traitType: "Lid",
        trait: pullLidAtUniform(),
      };
    }
  }

  let chosenTrait = "";
  switch (traitType) {
    case "Background": {
      chosenTrait = pullAtUniform("Background");
      break;
    }
    case "Cup": {
      chosenTrait = pullAtOdds("Cup");
      break;
    }
    case "Drink": {
      chosenTrait = pullAtUniform("Drink");
      break;
    }
    case "Blush": {
      chosenTrait = pullAtUniform("Blush");
      break;
    }
    case "Straw": {
      chosenTrait = pullAtUniformWithExclude("Straw", "None");
      break;
    }
    case "Eyes": {
      chosenTrait = pullAtUniform("Eyes");
      break;
    }
    case "Boba": {
      chosenTrait = pullAtUniform("Boba");
      break;
    }
    case "Glasses": {
      chosenTrait = pullAtUniformWithMoreNoneChance("Glasses", 0.4);
      break;
    }
    case "Accessory": {
      chosenTrait = pullAtUniformWithMoreNoneChance("Accessory", 0.4);
      break;
    }
    case "Sticker": {
      chosenTrait = pullAtUniformWithMoreNoneChance("Sticker", 0.4);
      break;
    }
    default: {
      throw new Error("unknown trait");
    }
  }

  const foundTrait = traitFinder(traitType, chosenTrait);
  if (foundTrait === undefined) {
    throw new Error("not ok");
  }
  return {
    traitType: traitType,
    trait: foundTrait,
  };
};

const pickNewRandomTrait = (existingNextTraits: TraitTuple[]): TraitTuple => {
  let pickLidVariation: string | undefined = undefined;
  let traitType: TraitType = "Lid";

  if (existingNextTraits.length === 0) {
    // Pick a new lid for the first one, but not a variation
  } else if (existingNextTraits.length === 1) {
    // Pick a new variation
    pickLidVariation = existingNextTraits[0].trait.traitName;
  } else {
    if (
      existingNextTraits[existingNextTraits.length - 2].traitType === "Lid" &&
      existingNextTraits[existingNextTraits.length - 1].traitType === "Lid"
    ) {
      // Don't repeat lid again. Last was variation
      traitType = nonLidTypes[Math.floor(Math.random() * nonLidTypes.length)];
    } else if (
      existingNextTraits[existingNextTraits.length - 1].traitType === "Lid"
    ) {
      // We have to do variation
      pickLidVariation =
        existingNextTraits[existingNextTraits.length - 1].trait.traitName;
    } else {
      traitType =
        loadedAllTraitTypes[
          Math.floor(Math.random() * loadedAllTraitTypes.length)
        ];

      // reroll
      if (
        existingNextTraits[existingNextTraits.length - 1].traitType ===
          traitType ||
        existingNextTraits[existingNextTraits.length - 2].traitType ===
          traitType
      ) {
        traitType =
          loadedAllTraitTypes[
            Math.floor(Math.random() * loadedAllTraitTypes.length)
          ];
      }
      // reroll
      if (
        existingNextTraits[existingNextTraits.length - 1].traitType ===
          traitType ||
        existingNextTraits[existingNextTraits.length - 2].traitType ===
          traitType
      ) {
        traitType =
          loadedAllTraitTypes[
            Math.floor(Math.random() * loadedAllTraitTypes.length)
          ];
      }
      // reroll
      if (
        existingNextTraits[existingNextTraits.length - 1].traitType ===
          traitType ||
        existingNextTraits[existingNextTraits.length - 2].traitType ===
          traitType
      ) {
        traitType =
          loadedAllTraitTypes[
            Math.floor(Math.random() * loadedAllTraitTypes.length)
          ];
      }
      // reroll
      if (
        existingNextTraits[existingNextTraits.length - 1].traitType ===
          traitType ||
        existingNextTraits[existingNextTraits.length - 2].traitType ===
          traitType
      ) {
        traitType =
          loadedAllTraitTypes[
            Math.floor(Math.random() * loadedAllTraitTypes.length)
          ];
      }
    }
  }

  let nextTrait: TraitTuple;

  nextTrait = pickRandomTraitForType(traitType, pickLidVariation);
  if (isDuplicate(nextTrait, existingNextTraits)) {
    nextTrait = pickRandomTraitForType(traitType, pickLidVariation);
  }
  if (isDuplicate(nextTrait, existingNextTraits)) {
    nextTrait = pickRandomTraitForType(traitType, pickLidVariation);
  }
  return nextTrait;
};

const initialNextTraits: TraitTuple[] = [];

initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));
initialNextTraits.push(pickNewRandomTrait(initialNextTraits));

export const EvolvingBaby = () => {
  const [nextTraits, setNextTraits] = useState<TraitTuple[]>(initialNextTraits);
  const [babySpecs, setBabySpecs] = useState<FullBobaBaby>(initialBaby);

  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useIntersectionObserver<HTMLDivElement>(ref);

  useEffect(() => {
    // setTimeout is every 100ms, but we only cycle every 400ms
    let n = 0;
    const id = setInterval(() => {
      if (document.hidden) {
        return;
      }
      if (n < 3) {
        n++;
        return;
      }
      if (ref.current !== null) {
        const nodes: NodeListOf<HTMLImageElement> =
          ref.current.querySelectorAll("#preload img");
        if (!nodes[0].complete || !nodes[1].complete) {
          // Don't advance if image is not yet loaded
          return;
        }
      }
      if (onScreen.isIntersecting) {
        setBabySpecs((prevState) => {
          let nextState = { ...prevState };
          if (nextTraits[0].traitType === "Lid") {
            nextState[nextTraits[0].traitType] = [
              nextTraits[0].trait.traitName,
              nextTraits[0].trait.subTraitName!!,
            ];
          } else {
            nextState[nextTraits[0].traitType] = nextTraits[0].trait.traitName;
          }
          return nextState;
        });
        setNextTraits((oldNextTraits) => {
          const nextOldNextTraits = oldNextTraits.slice(1);
          nextOldNextTraits.push(pickNewRandomTrait(nextTraits));
          return nextOldNextTraits;
        });
        n = 0;
      }
    }, 100);
    return () => clearInterval(id);
  });

  const preloadSet = new Set<string>();
  const preloadImages: JSX.Element[] = [];
  nextTraits.forEach((nextTraitTuple) => {
    nextTraitTuple.trait.layers.forEach((layer) => {
      if (!preloadSet.has(layer.fileName)) {
        preloadSet.add(layer.fileName);
        const placeholderPath = `/layers/${layer.fileName.replace(
          ".png",
          ".240.png"
        )}`;
        preloadImages.push(
          <img src={placeholderPath} key={placeholderPath} alt="" />
        );

        const filePath = `/layers/${layer.fileName.replace(
          ".png",
          ".960.png"
        )}`;
        preloadImages.push(<img src={filePath} key={filePath} alt="" />);
      }
    });
  });

  return (
    <div
      ref={ref}
      css={css`
        width: 480px;
        position: relative;
        border-radius: 12px;

        transform: translateZ(0);

        will-change: transform;
      `}
    >
      <div
        id={"preload"}
        css={css`
          position: absolute;
          width: 0;
          height: 0;
          left: 0;
          top: 0;
          user-select: none;
          display: none;
        `}
      >
        {preloadImages}
      </div>

      <div css={css``}>
        <BobaBabyCanvas
          baby={babySpecs}
          small={true}
          noBackground={true}
          noWatermark={true}
          unZoomable={true}
        />
      </div>
    </div>
  );
};
