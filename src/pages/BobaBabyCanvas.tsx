/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/react";
import React, { RefObject, useState } from "react";

import { FullBobaBaby, Layers, Trait, TraitCategory } from "../IArtDef";
import { babyArtDefinition } from "../babyArtDefinition";
import { css } from "@emotion/react";
import { AggressiveProgressiveImage } from "./AggressiveProgressiveImage";
import useResizeObserver from "@react-hook/resize-observer";

interface IProps {
  baby: FullBobaBaby;
  small: boolean;
  unZoomable?: boolean;
  noBackground?: boolean;
  noWatermark?: boolean;
  mobileForcedHover?: boolean;
}

const zoomLayer = css`
  transform-origin: center 30%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.25s ease-out;
`;

const canvasContainer = css`
  position: relative;
  width: 100%;
  /* min-height: 50px; */
  padding-top: 100%;
  overflow: hidden;

  & > div {
    transform: scale(1);
  }
`;

const canvasContainerZoomed = css`
  > div {
    transform: scale(1.3333);
  }
`;

const canvasContainerZoomable = css`
  &:hover > div {
    transform: scale(1.3333);
  }
`;

const artLayer = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  opacity: 1;

  image-rendering: auto;
  user-select: none;
  pointer-events: none;
`;

const artLayerBackground = css`
  transition: 0.16s opacity;
`;
const artLayerHide = css`
  transition: 0s opacity !important;
  /* transition: 0.4s opacity; */
  opacity: 0 !important;
  /* top: 200px !important; */
`;
const betaLayer = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  &::after {
    font-family: "Handlee";
    content: "beta";
    display: block;
    color: #000;
    opacity: 0.03;
    transform: rotate(-90deg);

    font-size: 30px;
    position: absolute;
    right: -45%;
    height: 100%;
    text-align: center;
    line-height: 1;
    margin-bottom: 0;
  }
`;
const betaFontSize = (canvasWidth: number) =>
  css`
    &::after {
      font-size: ${canvasWidth / 8}px;
    }
  `;

const useSize = (target: RefObject<HTMLDivElement>) => {
  const [size, setSize] = React.useState<number>(400);

  React.useLayoutEffect(() => {
    if (target.current) {
      setSize(target.current.getBoundingClientRect().width);
    }
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect.width));
  return size;
};

export const BobaBabyCanvas = (props: IProps) => {
  let layers: Layers = [];

  // Add the new old background
  const currentBackgroundTrait = babyArtDefinition.Background.traits.find(
    (trait) => trait.traitName === props.baby.Background
  );

  const currentBackgroundFileName =
    currentBackgroundTrait?.layers[0].fileName || "";

  const [oldBackgroundFileName, setOldBackgroundFileName] = useState<string>(
    currentBackgroundFileName
  );
  const [latestBackgroundFileName, setLatestBackgroundFileName] =
    useState<string>(currentBackgroundFileName);

  if (currentBackgroundFileName !== latestBackgroundFileName) {
    setTimeout(() => {
      setOldBackgroundFileName(latestBackgroundFileName);
      setLatestBackgroundFileName(currentBackgroundFileName);
    }, 1);
  }

  if (!props.noBackground) {
    if (
      currentBackgroundFileName === oldBackgroundFileName &&
      currentBackgroundFileName !== latestBackgroundFileName
    ) {
      layers.push({
        fileName: latestBackgroundFileName,
        zIndex: -1,
      });
    } else if (
      currentBackgroundFileName !== latestBackgroundFileName &&
      currentBackgroundFileName !== oldBackgroundFileName
    ) {
      layers.push({
        fileName: latestBackgroundFileName,
        zIndex: -1,
      });
    } else if (
      currentBackgroundFileName === latestBackgroundFileName &&
      currentBackgroundFileName !== oldBackgroundFileName
    ) {
      layers.push({
        fileName: oldBackgroundFileName,
        zIndex: -1,
      });
    }
  }

  for (const [traitType, traitName] of Object.entries(props.baby)) {
    if (props.noBackground && traitType === "Background") {
      continue;
    }
    // console.log(traitType, traitName);
    if (traitName !== null) {
      // @ts-ignore
      const category: TraitCategory = babyArtDefinition[traitType];

      let trait: Trait | undefined;

      if (traitType === "Lid") {
        trait = category.traits.find(
          (trait) =>
            trait.traitName === traitName[0] &&
            trait.subTraitName === traitName[1]
        );
        // console.log(trait);
      } else {
        trait = category.traits.find((trait) => trait.traitName === traitName);
        // console.log(trait);
      }

      if (trait) {
        // if (traitType === "Background") {
        //   // if (traitName === props.baby.Background) {
        //   //   newBackgroundFilename = trait.layers[0].fileName;
        //   // }
        // }

        for (const newLayer of trait.layers) {
          const existingLayer = layers.find(
            (layer) => layer.fileName === newLayer.fileName
          );
          if (existingLayer === undefined) {
            layers.push(newLayer);
          }
        }
      }
    } else {
      console.error("missing", traitType, traitName);
    }
  }

  const target = React.useRef<HTMLDivElement>(null);
  const size = useSize(target);
  const [hovering, setHovering] = useState<boolean>(false);

  const supportsTouch =
    "ontouchstart" in window || "msMaxTouchPoints" in navigator;

  let thecss: SerializedStyles[] = [];

  if (supportsTouch) {
    if (hovering || props.mobileForcedHover) {
      thecss = [canvasContainer, canvasContainerZoomed];
    } else {
      thecss = [canvasContainer];
    }
  } else {
    if (props.unZoomable) {
      thecss = [canvasContainer];
    } else {
      thecss = [canvasContainer, canvasContainerZoomable];
    }
  }
  if (props.unZoomable) {
    thecss = [canvasContainer];
  }

  return (
    <div
      className="BobaBabyCanvas"
      css={thecss}
      ref={target}
      onTouchStart={(event) => {
        // console.log("started");
        event.preventDefault();
        setHovering(true);
      }}
      onTouchEnd={(event) => {
        // console.log("end");
        event.preventDefault();
        setHovering(false);
      }}
    >
      {props.noWatermark ? null : (
        <span css={[betaLayer, betaFontSize(size)]}></span>
      )}
      <div css={zoomLayer}>
        {layers.map((layer) => {
          const filePath = `/layers/${layer.fileName.replace(
            ".png",
            props.small ? ".960.png" : ".2400.png"
          )}`;
          const placeholderPath = `/layers/${layer.fileName.replace(
            ".png",
            `.240.png`
          )}`;

          let apiCss: SerializedStyles[] = [artLayer];
          if (layer.zIndex <= 0) {
            apiCss.push(artLayerBackground);
          }
          if (
            currentBackgroundFileName !== latestBackgroundFileName &&
            layer.fileName === currentBackgroundFileName
          ) {
            apiCss.push(artLayerHide);
          }
          return (
            <AggressiveProgressiveImage
              key={filePath}
              fullSizePath={filePath}
              placeholderPath={placeholderPath}
              zIndex={layer.zIndex + 2}
              previewAlwaysOpaque={
                layer.zIndex === 0 ||
                layer.zIndex === -1 ||
                layer.zIndex === 2 ||
                layer.zIndex === 4
              }
              theCss={apiCss}
            />
          );
          // return size;
        })}
      </div>
    </div>
  );
};
