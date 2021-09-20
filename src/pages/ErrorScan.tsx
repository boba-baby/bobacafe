/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/react";
import { babyArtDefinition } from "../babyArtDefinition";
import { allTraitTypes, Trait, TraitType } from "../IArtDef";

export const cssOutline = css`
  outline: 1px solid green;
`;

const scanTraits = (trait: Trait) => {
  return trait.layers.map((layer) => {
    const filePath = `/layers/${layer.fileName.replace(".png", `.thumb.png`)}`;
    return (
      <div key={layer.fileName}>
        {layer.fileName}
        <br />
        <img
          key={layer.fileName}
          alt={layer.fileName}
          css={cssOutline}
          src={filePath}
          style={{ zIndex: layer.zIndex }}
        />
        <br />
        <br />
        <br />
      </div>
    );
  });
};
export const ErrorScan = () => {
  return (
    <div
      css={css`
        background: #000;
        color: #fff;
      `}
    >
      {allTraitTypes.map((traitType: TraitType) => {
        return (
          <div key={traitType}>
            {babyArtDefinition[traitType].traits.map(scanTraits)}
          </div>
        );
      })}
    </div>
  );
};
