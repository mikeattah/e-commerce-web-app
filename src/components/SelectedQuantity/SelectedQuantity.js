import React, { Component } from "react";
import "./SelectedQuantity.css";

class SelectedQuantity extends Component {
  render() {
    return (
      <button
        className="selected-quantity-button"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default SelectedQuantity;
