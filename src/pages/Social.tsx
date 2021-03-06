/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/react";

import discordLogo from "./discord.svg";
import twitterLogo from "./twitter.svg";
import githubLogo from "./github.svg";
export const Social = () => {
  return (
    <div
      css={css`
        a {
          padding: 30px 10px;
        }
        a:hover {
          opacity: 0.9;
        }
        img {
          width: 30px;
          height: 30px;
        }

        text-align: center;
      `}
    >
      <a
        rel="nofollow noreferrer"
        target="_blank"
        href="http://discord.gg/yQrchtzmnB"
      >
        <img src={discordLogo} alt="" />
      </a>
      <a
        rel="nofollow noreferrer"
        target="_blank"
        href="https://twitter.com/bobababyNFT"
      >
        <img src={twitterLogo} alt="" />
      </a>
      <a
        rel="nofollow noreferrer"
        target="_blank"
        href="https://github.com/boba-baby/bobacafe"
      >
        <img
          src={githubLogo}
          alt=""
          css={css`
            width: 28px !important;
            height: 28px !important;
            margin-bottom: 1px;
          `}
        />
      </a>
    </div>
  );
};
