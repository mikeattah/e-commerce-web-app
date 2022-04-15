import React, { Component } from "react";
import "./SelectedSize.css";

class SelectedSize extends Component {
  render() {
    let style;
    if (this.props.compSize === "large") {
      if (this.props.value === this.props.size) {
        style = "selected-size-large-active";
      } else {
        style = "selected-size-large";
      }
    } else {
      if (this.props.value === this.props.size) {
        style = "selected-size-small-active";
      } else {
        style = "selected-size-small";
      }
    }
    return (
      <button
        className={style}
        onClick={() => this.props.selectedSize(this.props.value)}
        disabled={this.props.disabled}
      >
        {this.props.displayValue}
      </button>
    );
  }
}

export default SelectedSize;
