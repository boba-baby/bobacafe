/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { SimulatorPicker, SimulatorPickerProps } from "./SimulatorPicker";

type MyState = {
  lastForced: string;
};

// we set props during render ... so we need to isolate the simulatorpicker from resetting
export class IsolatedPicker extends React.Component<
  SimulatorPickerProps,
  MyState
> {
  state: MyState = { lastForced: "" };
  shouldComponentUpdate(props: SimulatorPickerProps): boolean {
    if (props.forcedTraitValue && !this.state.lastForced) {
      this.setState({ lastForced: props.forcedTraitValue });
      return true;
    }

    if (!props.forcedTraitValue && this.state.lastForced) {
      this.setState({ lastForced: props.forcedTraitValue || "" });
      return true;
    }
    return false;
  }
  render() {
    return (
      <SimulatorPicker
        traitType={this.props.traitType}
        initialTraitValue={this.props.initialTraitValue}
        initialSubTraitValue={this.props.initialSubTraitValue}
        onChange={this.props.onChange}
        forcedTraitValue={this.props.forcedTraitValue}
        forcedSubTraitValue={this.props.forcedSubTraitValue}
        pickerLayout={this.props.pickerLayout}
      />
    );
  }
}
