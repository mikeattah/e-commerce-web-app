import React, { PureComponent } from "react";
import "./FillButton.css";

class FillButton extends PureComponent {
  render() {
    const { children, buttonClick, compSize, disabled } = this.props;
    return (
      <button
        className={`fill-button ${
          compSize === "large" ? "" : "fill-button-small"
        }`}
        onClick={() => buttonClick()}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default FillButton;
