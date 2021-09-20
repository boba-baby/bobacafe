/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/react";
export const WhiteSlantTop = () => (
  <div
    css={css`
      width: 100vw;
      overflow: hidden;
      height: 0;
      position: relative;
      z-index: 3;
    `}
  >
    <div
      css={css`
        position: absolute;
        width: calc(100vw+20px);
        margin-top: -1px;
        left: -10px;
        right: -10px;

        background: #fff;
        clip-path: polygon(100% 0, 0 0, 100% 100%);

        height: 4vw;
      `}
    ></div>
  </div>
);

export const WhiteSlantBottom = () => (
  <div
    css={css`
      width: 100vw;
      overflow: hidden;
      height: 0;
      position: relative;
      top: 1px;
      z-index: 3;
    `}
  >
    <div
      css={css`
        position: absolute;
        width: calc(100vw+20px);
        left: -10px;
        right: -10px;

        background: #fff;
        clip-path: polygon(0 100%, 0 0, 100% 98%, 100% 100%);
        height: 4vw;
        top: -4vw;
      `}
    ></div>
  </div>
);

export const BlueSlantTop = () => (
  <div
    css={css`
      width: 100vw;
      overflow: hidden;
      height: 0;
      position: relative;
      z-index: 3;
    `}
  >
    <div
      css={css`
        position: absolute;
        width: calc(100vw+20px);
        margin-top: -1px;
        left: -10px;
        right: -10px;

        background: #59d3ff;
        clip-path: polygon(100% 0, 0 0, 100% 100%);

        height: 4vw;
      `}
    ></div>
  </div>
);

export const BlueSlantBottom = () => (
  <div
    css={css`
      width: 100vw;
      overflow: hidden;
      height: 0;
      position: relative;
      top: 1px;
      z-index: 3;
    `}
  >
    <div
      css={css`
        position: absolute;
        width: calc(100vw+20px);
        left: -10px;
        right: -10px;

        background: #59d3ff;
        clip-path: polygon(0 100%, 0 0, 100% 98%, 100% 100%);
        height: 4vw;
        top: -4vw;
      `}
    ></div>
  </div>
);
