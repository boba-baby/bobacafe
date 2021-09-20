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
  onChange: (trait: string | [string, string]) => void;
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

const findFirstLidVariant = (traitName: string): string => {
  const found = find(babyArtDefinition.Lid.traits, (trait) => {
    return trait.traitName === traitName;
  });
  if (found === undefined) {
    throw new Error("found not found");
  }

  if (found.subTraitName === undefined) {
    throw new Error("subtrait undefined not found");
  }
  return found.subTraitName;
};

const option = css`
  cursor: pointer;
  padding: 8px 9px 8px 8px;
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
  align-items: center;
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
  span {
    padding: 0 8px;
    border-radius: 3px;
    margin-left: 0;
    margin-right: 5px;
  }
`;

const traitLoadingHackyBadge = css`
  font-size: 14px;
  margin-top: 1px;
  span {
    padding: 0 8px;
    margin-right: -1px;
    border-radius: 3px;
  }
`;

const rarityBadgeBackground = {
  Common: css`
    background: #eee;
  `,
  Rare: css`
    background: #eab5ff;
  `,
  "Ultra Rare": css`
    background: #ffcf21;
  `,
  "Secret Rare": css`
    background: #ffcf21;
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
  const possibleTraitsOptions = possibleTraits.map((trait) => ({
    value: trait,
    label: trait,
  }));

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
              props.onChange([selectedTraitName, preview]);
            } else {
              props.onChange(selectedTraitName);
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
            props.onChange([selectedTraitName, optionProps.label]);
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
          <span
            css={css`
              opacity: 0.2;
            `}
          >
            {showRarityFrequency
              ? `~${(rarityFrequency * 8888).toFixed(0)}`
              : null}
          </span>
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
            {optionProps.label}
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
              props.onChange([selectedTraitName, newSubTrait]);
            }}
            menuShouldScrollIntoView={false}
            menuShouldBlockScroll={false}
            isSearchable={
              !supportsTouch || (windowWidth > 600 && windowHeight > 800)
            }
            onMenuClose={() => {
              if (props.traitType === "Lid") {
                props.onChange([
                  selectedTraitName,
                  selectedSubTraitName as string,
                ]);
              } else {
                props.onChange(selectedTraitName);
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
            props.onChange([preview, findFirstLidVariant(preview)]);
          } else {
            props.onChange(preview);
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
            props.onChange([
              optionProps.label,
              findFirstLidVariant(optionProps.label),
            ]);
          } else {
            props.onChange(optionProps.label);
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
        <span
          css={css`
            opacity: 0.2;
          `}
        >
          {showRarityFrequency
            ? `~${(rarityFrequency * 8888).toFixed(0)}`
            : null}
        </span>
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
          {optionProps.label}
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
              props.onChange([newTrait, findFirstLidVariant(newTrait)]);
            } else {
              setTimeout(() => {
                setSelectedTraitName(newTrait);
              }, 5);
              props.onChange(newTrait);
            }
          }}
          menuShouldScrollIntoView={false}
          menuShouldBlockScroll={false}
          isSearchable={
            !supportsTouch || (windowWidth > 600 && windowHeight > 800)
          }
          onMenuClose={() => {
            if (props.traitType === "Lid") {
              props.onChange([
                selectedTraitName,
                selectedSubTraitName as string,
              ]);
            } else {
              props.onChange(selectedTraitName);
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
