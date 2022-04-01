import React, { Component } from "react";

class FillButton extends Component {
  render() {
    return (
      <button
        className="button"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default FillButton;
