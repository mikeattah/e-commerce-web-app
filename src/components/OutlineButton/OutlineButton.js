import React, { Component } from "react";
import "./OutlineButton.css";

class OutlineButton extends Component {
  render() {
    return (
      <button
        className="outline-button"
        onClick={() => this.props.buttonClick()}
      >
        {this.props.children}
      </button>
    );
  }
}

export default OutlineButton;
