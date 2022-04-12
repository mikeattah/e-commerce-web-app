import React, { Component } from "react";
import "./FillButton.css";

class FillButton extends Component {
  render() {
    return (
      <button
        className="fill-button"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default FillButton;
