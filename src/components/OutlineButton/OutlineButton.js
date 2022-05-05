import React, { PureComponent } from "react";
import "./OutlineButton.css";

class OutlineButton extends PureComponent {
  render() {
    const { children, buttonClick, compSize, disabled } = this.props;
    return (
      <button
        className={`outline-button ${
          compSize === "large" ? "" : "outline-button-small"
        }`}
        onClick={() => buttonClick()}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default OutlineButton;
