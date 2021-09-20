/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Interpolation, Theme } from "@emotion/react";
import React, { Fragment, useEffect, useState } from "react";

export interface AggressiveProgressiveProps {
  fullSizePath: string;
  placeholderPath: string;
  zIndex: number;
  theCss: Interpolation<Theme>;
  previewAlwaysOpaque: boolean;
}

const singletonLoaded: Record<string, boolean> = {};

// Aggressive because we show both
export const AggressiveProgressiveImage = (
  props: AggressiveProgressiveProps
) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(
    !!singletonLoaded[props.fullSizePath]
  );

  // Try to cajole the browser into loading the placeholder first
  const [delayMet, setDelayMet] = useState<boolean>(
    !!singletonLoaded[props.fullSizePath]
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayMet(true);
    }, 1);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Fragment>
      {isLoaded ? null : (
        <img
          alt={""}
          src={props.placeholderPath}
          css={props.theCss}
          style={{
            zIndex: props.zIndex * 2 + 1,
            opacity: isLoaded ? 0 : props.previewAlwaysOpaque ? 1 : 1,
          }}
        />
      )}
      {delayMet ? (
        <img
          alt={""}
          src={props.fullSizePath}
          onLoad={() => {
            setIsLoaded(true);
            singletonLoaded[props.fullSizePath] = true;
          }}
          css={props.theCss}
          style={{
            zIndex: props.zIndex * 2,
            opacity: isLoaded ? 1 : 0.2,
          }}
        />
      ) : null}
    </Fragment>
  );
};
