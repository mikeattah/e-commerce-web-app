import React, { Component } from "react";
import "./SelectedSize.css";

class SelectedSize extends Component {
  render() {
    return (
      <button
        className={
          this.props.compSize === "large"
            ? "selected-size-large"
            : "selected-size-small"
        }
        onClick={() => this.props.selectedSize(this.props.value)}
        disabled={this.props.disabled}
      >
        {this.props.displayValue}
      </button>
    );
  }
}

export default SelectedSize;
