/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { jsx, css } from "@emotion/react";

import { getBBAddress } from "./allBBAddresses";

const tr = css`
  .addressRest {
    color: #777;
  }
  .addressBB {
    font-weight: bold;
  }
`;

export const Directory = () => {
  const rows: JSX.Element[] = [];
  for (let id = 1; id <= 8888; id++) {
    // all BobaBB addresses are the same length
    const address = getBBAddress(id);
    if (address.length !== 44) {
      throw new Error("all addresses must be 44 chars");
    }
    const addressBoba = address.substr(0, 4);
    const addressNum = address.substr(4, 4);
    const addressRest = address.substr(8, 34);
    const addressBB = address.substr(42);
    rows.push(
      <tr key={id} css={tr}>
        <td>#{id}</td>
        <td>
          <code>
            <strong>{addressBoba}</strong>
            {addressNum}
            <span className="addressRest">{addressRest}</span>
            <span className="addressBB">{addressBB}</span>
          </code>
        </td>
        <td>view proof</td>
        <td>...</td>
      </tr>
    );
  }
  return (
    <div>
      <table
        css={css`
          position: relative;
        `}
      >
        <thead
          css={css`
            position: sticky;
          `}
        >
          <tr>
            <td>ID</td>
            <td>Address</td>
            <td>View Proof</td>
            <td>Owner</td>
            <td>View</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
