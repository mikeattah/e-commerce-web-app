import React, { Component } from "react";
import "./Attributes.css";

class Attributes extends Component {
  render() {
    let style;
    if (this.props.compSize === "large") {
      for (let attribute of this.props.attributes) {
        if (
          this.props.name === attribute[0] &&
          this.props.value === attribute[1]
        ) {
          style = "attributes-large-active";
        } else {
          style = "attributes-large";
        }
      }
    } else {
      for (let attribute of this.props.attributes) {
        if (
          this.props.name === attribute[0] &&
          this.props.value === attribute[1]
        ) {
          style = "attributes-small-active";
        } else {
          style = "attributes-small";
        }
      }
    }

    return (
      <button
        className={style}
        onClick={() =>
          this.props.container === "productpage"
            ? this.props.productAttributes(this.props.value)
            : this.props.cartItemAttributes(this.props.value)
        }
        disabled={this.props.disabled}
      >
        {this.props.displayValue}
      </button>
    );
  }
}

export default Attributes;
