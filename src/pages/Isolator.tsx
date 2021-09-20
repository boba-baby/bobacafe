/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";

export class Isolator extends React.Component<JSX.Element> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return this.props.children;
  }
}
