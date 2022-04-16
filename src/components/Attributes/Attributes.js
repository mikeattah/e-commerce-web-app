import React, { Component } from "react";
import "./Attributes.css";

class Attributes extends Component {
  render() {
    let style;
    if (this.props.compSize === "large") {
      if (this.props.value === this.props.attributes) {
        style = "attributes-large-active";
      } else {
        style = "attributes-large";
      }
    } else {
      if (this.props.value === this.props.attributes) {
        style = "attributes-small-active";
      } else {
        style = "attributes-small";
      }
    }
    return (
      <button
        className={style}
        onClick={() => this.props.selectedAttributes(this.props.value)}
        disabled={this.props.disabled}
      >
        {this.props.displayValue}
      </button>
    );
  }
}

export default Attributes;
