/** @jsxRuntime classic */
/** @jsx jsx */
import React, { ComponentType, useRef, useState } from "react";
import { Fragment } from "react";
import { jsx, css } from "@emotion/react";
import Select, {
  GroupTypeBase,
  OptionProps,
  OptionTypeBase,
} from "react-select";
import { babyArtDefinition } from "../babyArtDefinition";
import { uniq, find } from "lodash-es";
import { TraitType } from "../IArtDef";
import {
  rarityFinder,
  traitFinder,
  variationRarityFinder,
} from "./traitFinder";
import { PickerLayout } from "./Simulator";
import { useWindowWidth } from "@react-hook/window-size";
import { useWindowHeight } from "@react-hook/window-size";

export interface SimulatorPickerProps {
  pickerLayout: PickerLayout;
  traitType: TraitType;
  initialTraitValue: string;
  initialSubTraitValue?: string;
  forcedTraitValue?: string;
  forcedSubTraitValue?: string;
  onChange: (trait: string | [string, string], confirm: boolean) => void;
}

const showRarityFrequency = false;

const pickerAndLabelWrapper = css`
  &.forced > div > div {
    background: #94daff;
  }
  > div > div {
    transition: 0.3s background;
    cursor: pointer;
    &:hover {
    }
  }
  .react-select__control {
    border-width: 2px;
    border-color: #ddd;
    box-shadow: none !important;
  }

  .react-select__control {
  }
  .react-select__control--isFocused {
    border-color: #57c4ff !important;
  }
  .react-select__control--menu-is-open {
    border-color: #57c4ff !important;
  }
  > div:first-of-type > div:first-of-type > div:first-of-type > div {
    padding-top: 1px;
  }
`;

// Gets the first lid variant that is not secret rare
const findFirstLidVariant = (traitName: string): string => {
  let found = find(babyArtDefinition.Lid.traits, (trait) => {
    return (
      trait.traitName === traitName &&
      !trait.traitName.includes("Secret") &&
      !(trait.subTraitName && trait.subTraitName.includes("Secret"))
    );
  });
  if (found === undefined) {
    found = find(babyArtDefinition.Lid.traits, (trait) => {
      return trait.traitName === traitName;
    });

    if (found === undefined) {
      throw new Error("found actually not found");
    }
  }

  if (found.subTraitName === undefined) {
    throw new Error("subtrait undefined not found");
  }
  return found.subTraitName;
};

const option = css`
  cursor: pointer;
  padding: 4px 9px 4px 8px;
  font-size: 16px;
  line-height: 1.25;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.isFocused {
    background: #c3e6fa;
  }
  &.isSelected {
    background: #69c5fa;
  }
`;
const optionAmount = css`
  opacity: 0.5;
`;
const optionLeftContainer = css`
  display: flex;
  flex-grow: 1;
  align-items: center;
  min-height: 40px;
  margin-right: 4px;

  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;
`;
const optionThumbnail = css`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  flex-shrink: 0;
  position: relative;
  img {
    display: inline-block;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const rarityDescriptor = css`
  font-size: 14px;
  white-space: nowrap;
  flex-grow: 0;
  span {
    padding: 0 8px;
    border-radius: 3px;
    margin-left: 1px;
    margin-right: 5px;
  }
`;

const traitLoadingHackyBadge = css`
  font-size: 14px;
  margin-top: 1px;
`;

const rarityBadgeBackground = {
  Common: css`
    padding: 0 8px;
    margin-right: -1px;
    border-radius: 3px;
    background: #eee;
  `,
  Rare: css`
    padding: 0 8px;
    margin-right: -1px;
    border-radius: 3px;
    background: #eab5ff;
  `,
  "Ultra Rare": css`
    padding: 0 8px;
    margin-right: -1px;
    border-radius: 3px;
    background: #ffcf21;
  `,
  "Secret Rare": css`
    padding: 0 8px;
    margin-right: -1px;
    border-radius: 3px;
    background: #000;
    color: #fff;
  `,
};

export const SimulatorPicker = React.memo((props: SimulatorPickerProps) => {
  const possibleTraits = Array.from(
    uniq(
      babyArtDefinition[props.traitType].traits.map((trait) => {
        return trait.traitName;
      })
    )
  );
  const possibleTraitsOptions = possibleTraits.map((trait) => {
    return {
      value: trait,
      label: trait,
    };
  });

  if (possibleTraits[0] === undefined) {
    throw new Error("Shouldnt be undefined");
  }
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();

  const supportsTouch =
    "ontouchstart" in window || "msMaxTouchPoints" in navigator;

  const [selectedTraitName, setSelectedTraitName] = useState<string>(
    props.initialTraitValue
  );
  const [selectedSubTraitName, setSelectedSubTraitName] = useState<
    string | undefined
  >(props.initialSubTraitValue);

  setTimeout(() => {
    if (props.forcedTraitValue) {
      setSelectedTraitName(props.forcedTraitValue);
    }
    if (props.forcedSubTraitValue) {
      setSelectedSubTraitName(props.forcedSubTraitValue);
    }
  }, 4);

  let variantPicker: JSX.Element | undefined;

  const LoadingMessage: React.ComponentType = () => {
    return (
      <div
        css={css`
          text-align: center;
          padding: 9px 0 8px 0;
          color: #888;
        `}
      >
        No trait found with filter
      </div>
    );
  };
  if (props.traitType === "Lid" && selectedSubTraitName !== undefined) {
    const possibleSubTraits = Array.from(
      uniq(
        babyArtDefinition[props.traitType].traits
          .filter(
            (potentialTrait) => potentialTrait.traitName === selectedTraitName
          )
          .map((trait) => {
            return trait.subTraitName;
          })
      )
    ) as string[];

    const possibleSubTraitOptions = possibleSubTraits.map((subTrait) => ({
      value: subTrait,
      label: subTrait,
    }));
    let selectedOption = "";
    let focusedOptions: string[] = [];
    const CustomOption: ComponentType<
      OptionProps<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>
    > = (optionProps) => {
      let asynced = false;

      const ref = useRef<HTMLDivElement>(null);
      // hacks
      if (optionProps.isSelected) {
        selectedOption = optionProps.label;
        let preview = selectedOption;
        setTimeout(() => {
          asynced = true;

          if (focusedOptions.length) {
            preview = focusedOptions[0];
            if (props.traitType === "Lid") {
              props.onChange([selectedTraitName, preview], false);
            } else {
              props.onChange(selectedTraitName, false);
            }
          }
          focusedOptions = [];
        }, 0);
      }

      if (optionProps.isFocused) {
        focusedOptions.push(optionProps.label);
        setTimeout(() => {
          if (asynced) {
            return;
          }

          // ref?.current?.scrollIntoView({
          //   behavior: "smooth",
          //   block: "nearest",
          //   inline: "start",
          // });
          if (focusedOptions.length) {
            props.onChange([selectedTraitName, optionProps.label], false);
          }
          focusedOptions = [];
        }, 2);
      }

      const [rarityFrequency, rarityName] = variationRarityFinder(
        selectedTraitName,
        optionProps.label
      );
      const optionRarityIndicator = (
        <div css={rarityDescriptor}>
          {showRarityFrequency ? (
            <span
              css={css`
                opacity: 0.2;
              `}
            >
              `~${(rarityFrequency * 8888).toFixed(0)}`
            </span>
          ) : null}
          <span css={rarityBadgeBackground[rarityName]}>{rarityName}</span>{" "}
          {(Math.round(rarityFrequency * 10000) / 100).toFixed(2)}%
        </div>
      );

      const trait = traitFinder(
        props.traitType,
        selectedTraitName,
        optionProps.label
      );
      const thumbnail = trait ? (
        <span css={optionThumbnail}>
          <img
            key={trait.layers[trait.layers.length - 1].fileName}
            alt={trait.layers[trait.layers.length - 1].fileName}
            src={`/layers/${trait.layers[
              trait.layers.length - 1
            ].fileName.replace(".png", `.thumb.png`)}`}
          />
        </span>
      ) : null;

      return !optionProps.isDisabled ? (
        <div
          {...optionProps.innerProps}
          css={option}
          onClick={optionProps.innerProps.onClick}
          className={
            (optionProps.isFocused ? "isFocused" : "") +
            (optionProps.isSelected ? " isSelected" : "")
          }
          ref={ref}
        >
          <div css={optionLeftContainer}>
            {thumbnail}
            <span
              css={css`
                /* overflow-wrap: break-word; */
                /* word-break: break-all; */
              `}
            >
              {optionProps.label}
            </span>
          </div>
          {optionRarityIndicator}
        </div>
      ) : null;
    };

    const [rarityFrequency, rarityName] = variationRarityFinder(
      selectedTraitName,
      selectedSubTraitName
    );
    const RarityIndicator: React.ComponentType | null = () => {
      return (
        <div css={traitLoadingHackyBadge}>
          <span css={rarityBadgeBackground[rarityName]}>
            {(Math.round(rarityFrequency * 10000) / 100).toFixed(2)}%
          </span>
        </div>
      );
    };
    variantPicker = (
      <Fragment>
        <div
          css={pickerAndLabelWrapper}
          className={
            "pickerAndLabelWrapper " + (props.forcedTraitValue ? "forced" : "")
          }
        >
          <h4>
            Lid Variation{" "}
            <span css={optionAmount}>
              ({possibleSubTraitOptions.length}/
              {babyArtDefinition.Lid.traits.length})
            </span>
          </h4>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={possibleSubTraitOptions}
            value={{ value: selectedSubTraitName, label: selectedSubTraitName }}
            onChange={(newOption) => {
              //@ts-ignore
              const newSubTrait: string = newOption.value;

              setTimeout(() => {
                setSelectedSubTraitName(newSubTrait);
              }, 5);
              props.onChange([selectedTraitName, newSubTrait], true);
            }}
            menuShouldScrollIntoView={false}
            menuShouldBlockScroll={false}
            isSearchable={
              !supportsTouch || (windowWidth > 600 && windowHeight > 800)
            }
            onMenuClose={() => {
              if (props.traitType === "Lid") {
                props.onChange(
                  [selectedTraitName, selectedSubTraitName as string],
                  true
                );
              } else {
                props.onChange(selectedTraitName, true);
              }
            }}
            isLoading={true}
            styles={{
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
            components={{
              Option: CustomOption,
              LoadingIndicator: RarityIndicator,
              LoadingMessage,
            }}
          />
        </div>
      </Fragment>
    );
  }

  let selectedOption = "";
  let focusedOptions: string[] = [];
  const CustomOption: ComponentType<
    OptionProps<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>
  > = (optionProps) => {
    let asynced = false;

    const ref = useRef<HTMLDivElement>(null);
    // hacks
    if (optionProps.isSelected) {
      selectedOption = optionProps.label;
      let preview = selectedOption;
      setTimeout(() => {
        asynced = true;

        if (focusedOptions.length) {
          preview = focusedOptions[0];
          if (props.traitType === "Lid") {
            props.onChange([preview, findFirstLidVariant(preview)], false);
          } else {
            const traitFound = rarityFinder(props.traitType, preview);
            if (traitFound && traitFound[1] === "Secret Rare") {
            } else {
              props.onChange(preview, false);
            }
          }
        }
        focusedOptions = [];
      }, 0);
    }

    if (optionProps.isFocused) {
      focusedOptions.push(optionProps.label);
      setTimeout(() => {
        if (asynced) {
          return;
        }

        // ref?.current?.scrollIntoView({
        //   behavior: "smooth",
        //   block: "nearest",
        //   inline: "start",
        // });
        if (focusedOptions.length) {
          if (props.traitType === "Lid") {
            props.onChange(
              [optionProps.label, findFirstLidVariant(optionProps.label)],
              false
            );
          } else {
            const traitFound = rarityFinder(props.traitType, optionProps.label);
            if (traitFound && traitFound[1] === "Secret Rare") {
            } else {
              props.onChange(optionProps.label, false);
            }
          }
        }
        focusedOptions = [];
      }, 2);
    }

    const [rarityFrequency, rarityName] = rarityFinder(
      props.traitType,
      optionProps.label
    );
    let rarityInfo = (
      <div css={rarityDescriptor}>
        {showRarityFrequency ? (
          <span
            css={css`
              opacity: 0.2;
            `}
          >
            `~${(rarityFrequency * 8888).toFixed(0)}`
          </span>
        ) : null}
        <span css={rarityBadgeBackground[rarityName]}>{rarityName}</span>{" "}
        {(Math.round(rarityFrequency * 10000) / 100).toFixed(2)}%
      </div>
    );

    const trait =
      props.traitType === "Lid"
        ? traitFinder(
            props.traitType,
            optionProps.label,
            findFirstLidVariant(optionProps.label)
          )
        : traitFinder(props.traitType, optionProps.label);
    const thumbnail = trait ? (
      <span css={optionThumbnail}>
        <img
          key={trait.layers[trait.layers.length - 1].fileName}
          alt={trait.layers[trait.layers.length - 1].fileName}
          src={`/layers/${trait.layers[
            trait.layers.length - 1
          ].fileName.replace(".png", `.thumb.png`)}`}
        />
      </span>
    ) : null;

    return !optionProps.isDisabled ? (
      <div
        {...optionProps.innerProps}
        css={option}
        onClick={optionProps.innerProps.onClick}
        className={
          (optionProps.isFocused ? "isFocused" : "") +
          (optionProps.isSelected ? " isSelected" : "")
        }
        ref={ref}
      >
        <div css={optionLeftContainer}>
          {thumbnail}
          <span
            css={css`
              /* word-break: break-all; */
            `}
          >
            {optionProps.label}
          </span>
        </div>
        {rarityInfo}
      </div>
    ) : null;
  };

  const [rarityFrequency, rarityName] = rarityFinder(
    props.traitType,
    selectedTraitName
  );
  const RarityIndicator: React.ComponentType | null = () => {
    return (
      <div css={traitLoadingHackyBadge}>
        <span css={rarityBadgeBackground[rarityName]}>
          {(Math.round(rarityFrequency * 10000) / 100).toFixed(2)}%
        </span>
      </div>
    );
  };

  return (
    <Fragment>
      <div
        css={pickerAndLabelWrapper}
        className={
          "pickerAndLabelWrapper " + (props.forcedTraitValue ? "forced" : "")
        }
      >
        <h4>
          {props.traitType}{" "}
          <span css={optionAmount}>({possibleTraitsOptions.length})</span>
        </h4>
        <Select
          className="react-select-container"
          style={{ width: "500px" }}
          classNamePrefix="react-select"
          options={possibleTraitsOptions}
          value={{ value: selectedTraitName, label: selectedTraitName }}
          maxMenuHeight={Math.max(300, window.innerHeight * 0.8 - 50)}
          onChange={(newOption) => {
            //@ts-ignore
            const newTrait: string = newOption.value;
            if (props.traitType === "Lid") {
              setTimeout(() => {
                setSelectedTraitName(newTrait);
                setSelectedSubTraitName(findFirstLidVariant(newTrait));
              }, 5);
              props.onChange([newTrait, findFirstLidVariant(newTrait)], true);
            } else {
              const traitFound = rarityFinder(props.traitType, newTrait);
              if (traitFound && traitFound[1] === "Secret Rare") {
                props.onChange(selectedTraitName, true);
                alert(
                  "Secret rare traits can not be previewed. They will be revealed after the mint goes live."
                );
              } else {
                setTimeout(() => {
                  setSelectedTraitName(newTrait);
                }, 5);
                props.onChange(newTrait, true);
              }
            }
          }}
          menuShouldScrollIntoView={false}
          menuShouldBlockScroll={false}
          isSearchable={
            !supportsTouch || (windowWidth > 600 && windowHeight > 800)
          }
          onMenuClose={() => {
            if (props.traitType === "Lid") {
              props.onChange(
                [selectedTraitName, selectedSubTraitName as string],
                true
              );
            } else {
              props.onChange(selectedTraitName, true);
            }
          }}
          isLoading={true}
          styles={{
            indicatorSeparator: () => ({
              display: "none",
            }),
          }}
          components={{
            Option: CustomOption,
            LoadingIndicator: RarityIndicator,
            LoadingMessage,
          }}
        />
      </div>
      {variantPicker}
    </Fragment>
  );
});
