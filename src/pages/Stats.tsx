/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/react";
import { totalPossibilities, uniqueTraits } from "../stats";

const statBlock = css`
  width: 25%;
  line-height: 1;

  margin-bottom: 0;
  text-align: center;

  @media (max-width: 1080px) {
    width: 50%;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const statNumber = css`
  font-size: 48px;
  display: block;
  margin-bottom: 0;
  padding: 0;
`;
const statNumberSmaller = css`
  line-height: 48px;
  font-size: 28px;
`;

const statTitle = css`
  font-size: 32px;
  display: block;
`;
export const Stats = () => {
  return (
    <div
      css={css`
        max-width: 1100px;
        margin: 0 auto;
        color: #444;
        /* line-height: 1.25; */
        padding: 80px 60px 60px;
        display: flex;
        flex-wrap: wrap;
        gap: 60px 0;
        font-weight: 300;
        align-items: flex-end;
        justify-content: space-around;
        @media (max-width: 650px) {
          width: 100%;
          gap: 40px 0;
        }
      `}
    >
      <p css={statBlock}>
        <span css={statNumber}>{Number(8888).toLocaleString()}</span>{" "}
        <span css={statTitle}>BobaBabies</span>
      </p>
      <p css={statBlock}>
        <span css={statNumber}>6000px</span>{" "}
        <span css={statTitle}>art resolution</span>
      </p>
      <p css={statBlock}>
        <span css={statNumber}>{uniqueTraits}</span>{" "}
        <span css={statTitle}>unique traits</span>
      </p>
      <p css={statBlock}>
        <span css={[statNumber, statNumberSmaller]}>
          {totalPossibilities.toLocaleString()}
        </span>{" "}
        <span css={statTitle}>possibilities</span>
      </p>
    </div>
  );
};
