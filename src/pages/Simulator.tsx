/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { jsx, css } from "@emotion/react";
import { BobaBabyCanvas } from "./BobaBabyCanvas";
import { FullBobaBaby, TraitType } from "../IArtDef";
import { IsolatedPicker } from "./IsolatedPicker";
import { generateLoadedRandom } from "./randomUtils";
import { useElementSize } from "usehooks-ts";
import { Tappable } from "./Tappable";
import { ActualCanvas } from "./ActualCanvas";
import { Rectifier } from "../Roooooller";

export type PickerLayout = "table" | "2x" | "3x" | "stacked";

const initialBaby = generateLoadedRandom();
// {
//   Lid: initialBaby.Lid,
//   Straw: initialBaby.Straw,
//   Accessory: initialBaby.Accessory,
//   Eyes: initialBaby.Eyes,
//   Glasses: initialBaby.Glasses,
//   Blush: initialBaby.Blush,
//   Sticker: initialBaby.Sticker,
//   Cup: initialBaby.Cup,
//   Drink: initialBaby.Drink,
//   Boba: initialBaby.Boba,
//   Background: initialBaby.Background,
// }
const initialNextBaby = Rectifier(generateLoadedRandom());
type UpdateStackItem = {
  traitType: TraitType;
  traitValue: string;
  subTraitValue?: string | undefined;
};
export const Simulator = () => {
  const [babySpecs, setBabySpecs] = useState<FullBobaBaby>(initialBaby);
  // Contains the baby spec that should be shown. It's here because the randomize doesn't always happen at once
  const [intendedBabySpecs, setIntendedBabySpecs] =
    useState<FullBobaBaby>(initialBaby);
  const [nextBabySpecs, setNextBabySpecs] =
    useState<FullBobaBaby>(initialNextBaby);

  const [updateStack, setUpdateStack] = useState<UpdateStackItem[]>([]);

  const controlsRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(controlsRef);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (updateStack.length) {
        setUpdateStack((oldUpdateStack) => {
          if (oldUpdateStack.length) {
            const first = oldUpdateStack[0];
            if (first) {
              if (first.traitType === "Lid") {
                setBabySpecs((prevState) => ({
                  ...prevState,
                  [first.traitType]: [first.traitValue, first.subTraitValue],
                }));
              } else {
                setBabySpecs((prevState) => ({
                  ...prevState,
                  [first.traitType]: first.traitValue,
                }));
              }
            }
          }

          return oldUpdateStack.slice(1);
        });
      }
    }, 33.4);
    return () => clearTimeout(interval);
  }, [updateStack]);

  const babyCanvasContainerRef = useRef<HTMLDivElement>(null);

  const createSimulatorPicker = (
    pickerLayout: PickerLayout,
    traitType: TraitType,
    initialTrait: string,
    initialSubTrait?: string
  ) => {
    // console.log("Closure created", babySpecs, intendedBabySpecs);
    return (
      <IsolatedPicker
        traitType={traitType}
        initialTraitValue={initialTrait}
        initialSubTraitValue={initialSubTrait}
        forcedTraitValue={
          updateStack.length > 0 && updateStack[0].traitType === traitType
            ? updateStack[0].traitValue
            : undefined
        }
        forcedSubTraitValue={
          updateStack.length > 0 && updateStack[0].traitType === traitType
            ? updateStack[0].subTraitValue
            : undefined
        }
        onChange={function (trait, confirm): void {
          // console.log("Another", babySpecs);
          // if (confirm) {
          //   // console.log("Confirm");
          //   setIntendedBabySpecs(() =>
          //     Rectifier({
          //       ...babySpecs,
          //       [traitType]: trait,
          //     })
          //   );
          setBabySpecs((prevState) => ({ ...prevState, [traitType]: trait }));
          setIntendedBabySpecs((prevState) => ({
            ...prevState,
            [traitType]: trait,
          }));
          // } else {
          // setBabySpecs(() =>
          //   Rectifier({ ...intendedBabySpecs, [traitType]: trait })
          // );
          // }
        }}
        pickerLayout={pickerLayout}
      />
    );
  };
  // console.log(babySpecs, intendedBabySpecs);

  let pickerLayout: PickerLayout = "table";
  if (width && height) {
    if (width < 480) {
      pickerLayout = "stacked";
    }
    if (width > 600 && height < 800) {
      pickerLayout = "2x";
    }
    if (width > 850 && height < 800) {
      pickerLayout = "3x";
    }
  }

  let pickerLayoutClass = " layout2x ";
  if (pickerLayout === "stacked") {
    pickerLayoutClass = " layoutStacked ";
  } else if (pickerLayout === "table") {
    pickerLayoutClass = " layoutTable ";
  } else if (pickerLayout === "3x") {
    pickerLayoutClass = " layout3x ";
  }
  return (
    <div
      css={css`
        max-width: 2400px;
        margin: 0 auto 0 auto;
      `}
    >
      <div
        css={css`
          display: flex;
          width: 100%;
          justify-content: center;

          @media (max-width: 800px) {
            flex-wrap: wrap;
          }
        `}
      >
        <Tappable
          thecss={css`
            width: 100%;
            flex-grow: 1;
            max-width: 100vh;
            max-width: calc(var(--vh, 1vh) * 100);
            cursor: ns-resize;
            touch-action: manipulation;
            transition: 0.15s width ease-out;
            will-change: width;
          `}
          theref={babyCanvasContainerRef}
          onClickOrTap={() => {
            babyCanvasContainerRef.current?.scrollIntoView({
              behavior: "smooth",
              inline: "nearest",
            });
          }}
        >
          <BobaBabyCanvas
            baby={Rectifier(babySpecs)}
            small={false}
            thecss={css`
              /* display: block; */
              position: sticky;
              top: 0;
            `}
          />
        </Tappable>
        <div
          css={css`
            /* width: 100%; */
            flex-grow: 1;
            min-width: 360px;
            flex-shrink: 0;
            max-width: 900px;
            display: flex;
            flex-direction: column;
            padding-top: 80px;
            padding-bottom: 120px;
            padding-left: 40px;
            padding-right: 40px;
            align-self: center;

            @media (max-width: 800px) {
              padding-top: 40px;
            }
            @media (max-width: 360px) {
              min-width: 300px;
            }
          `}
        >
          <div
            css={css`
              padding-top: 20px;
              padding-bottom: 20px;
              text-align: center;
              order: 3;

              @media (max-width: 800px) {
                order: 1;
              }
              @media (max-width: 640px) {
                padding-bottom: 20px;
                padding-top: 0;
              }
            `}
          >
            {" "}
            <button
              css={css`
                width: 50%;
                margin: 0 auto;
                height: 40px;
                border: 2px solid #94daff;
                border-radius: 4px;
                background: #94daff22;
                cursor: pointer;
              `}
              onClick={() => {
                setIntendedBabySpecs(Rectifier(nextBabySpecs));
                setNextBabySpecs(Rectifier(generateLoadedRandom()));
                setUpdateStack([
                  {
                    traitType: "Lid",
                    traitValue: nextBabySpecs.Lid[0],
                    subTraitValue: nextBabySpecs.Lid[1],
                  },
                  {
                    traitType: "Straw",
                    traitValue: nextBabySpecs.Straw,
                  },
                  {
                    traitType: "Accessory",
                    traitValue: nextBabySpecs.Accessory,
                  },
                  {
                    traitType: "Eyes",
                    traitValue: nextBabySpecs.Eyes,
                  },
                  {
                    traitType: "Glasses",
                    traitValue: nextBabySpecs.Glasses,
                  },
                  {
                    traitType: "Blush",
                    traitValue: nextBabySpecs.Blush,
                  },
                  {
                    traitType: "Sticker",
                    traitValue: nextBabySpecs.Sticker,
                  },
                  {
                    traitType: "Cup",
                    traitValue: nextBabySpecs.Cup,
                  },
                  {
                    traitType: "Drink",
                    traitValue: nextBabySpecs.Drink,
                  },
                  {
                    traitType: "Boba",
                    traitValue: nextBabySpecs.Boba,
                  },
                  {
                    traitType: "Background",
                    traitValue: nextBabySpecs.Background,
                  },
                ]);
              }}
            >
              Randomize
            </button>
            {/* <button
              css={css`
                width: 50%;
                margin: 0 auto;
                height: 40px;
                border: 2px solid #94daff;
                border-radius: 4px;
                background: #94daff22;
                cursor: pointer;
              `}
              onClick={() => {
                setIntendedBabySpecs(nextBabySpecs);
                setNextBabySpecs(rooooolRandomFromHash());
                setUpdateStack([
                  {
                    traitType: "Lid",
                    traitValue: nextBabySpecs.Lid[0],
                    subTraitValue: nextBabySpecs.Lid[1],
                  },
                  {
                    traitType: "Straw",
                    traitValue: nextBabySpecs.Straw,
                  },
                  {
                    traitType: "Accessory",
                    traitValue: nextBabySpecs.Accessory,
                  },
                  {
                    traitType: "Eyes",
                    traitValue: nextBabySpecs.Eyes,
                  },
                  {
                    traitType: "Glasses",
                    traitValue: nextBabySpecs.Glasses,
                  },
                  {
                    traitType: "Blush",
                    traitValue: nextBabySpecs.Blush,
                  },
                  {
                    traitType: "Sticker",
                    traitValue: nextBabySpecs.Sticker,
                  },
                  {
                    traitType: "Cup",
                    traitValue: nextBabySpecs.Cup,
                  },
                  {
                    traitType: "Drink",
                    traitValue: nextBabySpecs.Drink,
                  },
                  {
                    traitType: "Boba",
                    traitValue: nextBabySpecs.Boba,
                  },
                  {
                    traitType: "Background",
                    traitValue: nextBabySpecs.Background,
                  },
                ]);
              }}
            >
              TrueRandomizer
            </button> */}
          </div>

          <div
            ref={controlsRef}
            css={css`
              width: 100%;
              display: grid;
              gap: 10px 20px;
              grid-template-columns: repeat(1, 1fr);
              align-content: space-around;
              justify-content: space-around;
              box-sizing: border-box;
              order: 2;

              @media (max-width: 640px) {
                grid-template-columns: repeat(1, 1fr);
                /* order: 1; */
              }

              &.layoutStacked .pickerAndLabelWrapper {
                h4 {
                  margin-bottom: 0;
                }
              }
              &.layoutTable .pickerAndLabelWrapper {
                display: flex;
                align-items: center;
                h4 {
                  width: 150px;
                  flex-shrink: 0;
                  text-align: right;
                  padding-right: 16px;
                  white-space: nowrap;
                  margin-bottom: 0;
                  padding-top: 2px;
                  font-weight: 500;
                }
                > div {
                  width: 100%;
                }
              }
              &.layout2x {
                grid-template-columns: repeat(2, 1fr);
              }
              &.layout3x {
                grid-template-columns: repeat(3, 1fr);
              }
            `}
            className={pickerLayoutClass}
          >
            {createSimulatorPicker(
              pickerLayout,
              "Lid",
              babySpecs.Lid[0],
              babySpecs.Lid[1]
            )}
            {createSimulatorPicker(pickerLayout, "Straw", babySpecs.Straw)}
            {createSimulatorPicker(
              pickerLayout,
              "Accessory",
              babySpecs.Accessory
            )}
            {createSimulatorPicker(pickerLayout, "Eyes", babySpecs.Eyes)}
            {createSimulatorPicker(pickerLayout, "Glasses", babySpecs.Glasses)}
            {createSimulatorPicker(pickerLayout, "Blush", babySpecs.Blush)}
            {createSimulatorPicker(pickerLayout, "Sticker", babySpecs.Sticker)}
            {createSimulatorPicker(pickerLayout, "Cup", babySpecs.Cup)}
            {createSimulatorPicker(pickerLayout, "Drink", babySpecs.Drink)}
            {createSimulatorPicker(pickerLayout, "Boba", babySpecs.Boba)}
            {createSimulatorPicker(
              pickerLayout,
              "Background",
              babySpecs.Background
            )}
          </div>
          <div
            css={css`
              display: none;
            `}
          >
            <BobaBabyCanvas baby={Rectifier(intendedBabySpecs)} small={false} />
            <BobaBabyCanvas baby={Rectifier(nextBabySpecs)} small={false} />
          </div>
          <div
            css={css`
              order: 5;
              margin-top: 10px;

              @media (max-width: 800px) {
                margin-top: 30px;
              }
            `}
          >
            <ActualCanvas
              baby={Rectifier(intendedBabySpecs)}
              showDownloadLink={false}
              setFavicon={true}
              resolution={240}
            />
            <ActualCanvas
              baby={Rectifier(intendedBabySpecs)}
              showDownloadLink={true}
              resolution={240}
            />
            <ActualCanvas
              baby={Rectifier(intendedBabySpecs)}
              showDownloadLink={true}
              resolution={960}
            />
            <ActualCanvas
              baby={Rectifier(intendedBabySpecs)}
              showDownloadLink={true}
              resolution={2400}
            />
            <ActualCanvas
              baby={Rectifier(intendedBabySpecs)}
              showDownloadLink={true}
              resolution={6000}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
