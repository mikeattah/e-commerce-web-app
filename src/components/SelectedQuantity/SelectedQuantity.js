import React, { Component } from "react";
import "./SelectedQuantity.css";

class SelectedQuantity extends Component {
  render() {
    return (
      <button
        className={
          this.props.compSize === "large"
            ? "selected-quantity-large"
            : "selected-quantity-small"
        }
        onClick={() => this.props.buttonClick()}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default SelectedQuantity;
