/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, SerializedStyles } from "@emotion/react";

export const Tappable = (props: {
  theref: React.RefObject<HTMLDivElement>;
  onClickOrTap: () => void;
  children: React.ReactNode;
  css?: never;
  ref?: never;
  thecss?: SerializedStyles;
}) => {
  // const [touchTime, setTouchTime] = useState<number>(Date.now());
  // const [touchX, setTouchX] = useState<number>(-1000);
  // const [touchY, setTouchY] = useState<number>(-1000);

  return (
    <div
      css={props.thecss}
      ref={props.theref}
      // onTouchStart={(event) => {
      //   setTouchTime(Date.now());
      //   setTouchX(event.touches[0].screenX);
      //   setTouchY(event.touches[0].screenY);
      // }}
      onClick={() => {
        const supportsTouch =
          "ontouchstart" in window || "msMaxTouchPoints" in navigator;
        if (supportsTouch) return;
        props.onClickOrTap();
      }}
      // onTouchEnd={(event) => {
      // if (
      //   Math.abs(touchX - event.touches[0].screenX) < 100 &&
      //   Math.abs(touchY - event.touches[0].screenY) < 100 &&
      //   touchTime - Date.now() < 300
      // ) {
      //   // TODO: fix this
      //   props.onClickOrTap();
      // }
      // }}
    >
      {props.children}
    </div>
  );
};
