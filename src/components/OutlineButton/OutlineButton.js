import React, { Component } from "react";
import "./OutlineButton.css";

class OutlineButton extends Component {
  render() {
    return (
      <button
        className={`outline-button ${
          this.props.compSize === "large" ? "" : "outline-button-small"
        }`}
        onClick={() => this.props.buttonClick()}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default OutlineButton;
