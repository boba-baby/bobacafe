/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from "@emotion/react";
import { generateLoadedRandom } from "./randomUtils";
import { BobaBabyCanvas } from "./BobaBabyCanvas";
import { useWindowWidth } from "@react-hook/window-size";
import { traitFinder } from "./traitFinder";
import { FullBobaBaby, Trait } from "../IArtDef";

const total = 33;
const initialBabies = Array(total)
  .fill(null)
  .map(() => generateLoadedRandom());
const initialNextCandidate = generateLoadedRandom();
const initialNextNextCandidate = generateLoadedRandom();
// 30-60-90 triangle
// (240+30)*sqrt(3)/2-240 = -6 of vertical padding
const row = css`
  display: flex;
  gap: 30px;
  margin-top: -6px;
  justify-content: center;

  @media (max-width: 1140px) {
    gap: 27px;
    // (210+27)*sqrt(3)/2-210 = -4.75 of vertical padding
    margin-top: -5px;
  }
  @media (max-width: 1140px) {
    gap: 22px;
    // (180+22)*sqrt(3)/2-180 = -5 of vertical padding
    margin-top: -5px;
  }
`;

const babyCircle = css`
  width: 240px;
  overflow: hidden;
  border-radius: 50%;
  transform: translateZ(0);

  clip-path: circle(120px at center);
  will-change: transform;

  @media (max-width: 1140px) {
    width: 210px;
    clip-path: circle(105px at center);
  }
  @media (max-width: 640px) {
    width: 180px;
    clip-path: circle(90px at center);
  }
`;
const babyCircleGlow = css`
  width: 250px;
  height: 250px;
  position: absolute;
  top: -5px;
  bottom: -5px;
  left: -5px;
  right: -5px;
  filter: blur(10px);
  opacity: 0.4;
  user-select: none;
  will-change: transform;
  transition: 0.5s transform;

  img {
    width: 100%;
    height: 100%;

    overflow: hidden;
    border-radius: 50%;
  }

  @media (max-width: 1140px) {
    width: 220px;
    height: 220px;
  }
  @media (max-width: 640px) {
    width: 190px;
    height: 190px;
  }
`;

const babyContainer = css`
  height: 240px;
  width: 240px;
  border-radius: 50%;
  position: relative;
  transition: 0.4s transform;
  cursor: pointer;
  transform: scale(1);

  &.held {
    transition: 0.07s transform;
    transform: scale(1.2);
  }
  &.held > div:first-of-type {
    transform: scale(1.1);
  }

  @media (max-width: 1140px) {
    height: 210px;
    width: 210px;
  }
  @media (max-width: 640px) {
    height: 180px;
    width: 180px;
  }
`;

interface ClickableProps {
  bgTrait: Trait;
  baby: FullBobaBaby;
  onPop: () => void;
}
const ClickableCircle = (props: ClickableProps) => {
  const [babyPopped, setBabyPopped] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      setBabyPopped(false);
      setHovering(false);
    }, 70);
    return () => clearTimeout(interval);
  }, [babyPopped]);

  return (
    <div
      css={babyContainer}
      className={babyPopped ? "held" : ""}
      onMouseDown={(event) => {
        //@ts-ignore
        const supportsTouch =
          "ontouchstart" in window || "msMaxTouchPoints" in navigator;
        if (supportsTouch) {
          return;
        }
        props.onPop();
        setBabyPopped(true);
      }}
      onTouchStart={(event) => {
        event.preventDefault();
        props.onPop();
        setBabyPopped(true);
        setHovering(true);
      }}
      onTouchEnd={(event) => {
        event.preventDefault();
        setHovering(false);
      }}
    >
      <div css={babyCircleGlow}>
        <img
          src={`/layers/${props.bgTrait.layers[0].fileName.replace(
            ".png",
            `.240.png`
          )}`}
          alt=""
          css={css`
            z-index: 50;
          `}
        />
      </div>
      <div css={babyCircle}>
        <BobaBabyCanvas
          baby={props.baby}
          key={JSON.stringify(props.baby)}
          small={true}
          mobileForcedHover={hovering}
        />
      </div>
    </div>
  );
};

export const Randoms = () => {
  const windowWidth = useWindowWidth();
  const [babies, setBabies] = useState<FullBobaBaby[]>(initialBabies);

  let layout = [6, 5, 6, 5, 6, 5];

  if (windowWidth < 940) {
    layout = [5, 4, 5, 4, 5, 4];
  }
  if (windowWidth < 710) {
    layout = [4, 3, 4, 3, 4, 3];
  }
  if (windowWidth < 424) {
    layout = [3, 2, 3, 2, 3, 2];
  }

  const [babyHovered, setBabyHovered] = useState<number>(-1);
  const [popNextCandidate, setPopNextCandidate] =
    useState<FullBobaBaby>(initialNextCandidate);
  const [popNextNextCandidate, setPopNextNextCandidate] =
    useState<FullBobaBaby>(initialNextNextCandidate);

  useEffect(() => {
    // let n = 0;
    const interval = setTimeout(() => {
      // if (babyHovered === -1) return;
      // n += 1;
      // // if (n > 2) {
      // setBabies((prevState) => {
      //   const copy = prevState.slice();
      //   copy[babyHovered] = popNextCandidate;
      //   return copy;
      // });
      // setPopNextCandidate(generateLoadedRandom());
      setBabyHovered(-1);
    }, 4);
    return () => clearTimeout(interval);
  }, [babyHovered]);

  if (
    layout.reduce((prev, current) => {
      return prev + current;
    }) > total
  ) {
    throw new Error("too much");
  }

  const allRows: JSX.Element[] = [];

  let currentBaby = 0;

  for (const rowNum in layout) {
    const currentRow: JSX.Element[] = [];
    // eslint-disable-next-line no-loop-func
    const addBB = (currentBaby: number) => {
      const bgTrait: Trait = traitFinder(
        "Background",
        babies[currentBaby].Background
      ) as Trait;
      currentRow.push(
        <ClickableCircle
          bgTrait={bgTrait}
          onPop={() => {
            setBabies((prevState) => {
              const copy = prevState.slice();
              copy[currentBaby] = popNextCandidate;
              return copy;
            });

            setPopNextCandidate(popNextNextCandidate);
            setPopNextNextCandidate(generateLoadedRandom());
          }}
          baby={babies[currentBaby]}
          key={currentBaby}
        />
      );
    };
    for (let i = 0; i < layout[rowNum]; i++) {
      addBB(currentBaby);
      currentBaby++;
    }
    allRows.push(
      <div css={row} key={rowNum}>
        {currentRow}
      </div>
    );
  }

  return (
    <div
      css={css`
        overflow: hidden;
        padding-top: 100px;
        padding-bottom: 80px;
      `}
    >
      <div
        css={css`
          /*Preload*/
          display: none;
        `}
      >
        <BobaBabyCanvas baby={popNextCandidate} small={true} />
        <BobaBabyCanvas baby={popNextNextCandidate} small={true} />
      </div>
      {allRows}
    </div>
  );
};
