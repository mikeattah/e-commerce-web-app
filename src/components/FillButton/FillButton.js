import React, { Component } from "react";
import "./FillButton.css";

class FillButton extends Component {
  render() {
    return (
      <button
        className={`fill-button ${
          this.props.compSize === "large" ? "" : "fill-button-small"
        }`}
        onClick={() => this.props.buttonClick()}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default FillButton;
