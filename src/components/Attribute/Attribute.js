import React, { Component } from "react";
import "./Attribute.css";

class Attribute extends Component {
  render() {
    let style =
      this.props.compSize === "large" ? "attribute-large" : "attribute-small";
    const attributes = this.props.attributes;
    if (this.props.compSize === "large") {
      for (let attribute of attributes) {
        if (
          this.props.name === attribute[0] &&
          this.props.value === attribute[1]
        ) {
          style = "attribute-large-selected";
        }
      }
    } else {
      for (let attribute of attributes) {
        if (
          this.props.name === attribute[0] &&
          this.props.value === attribute[1]
        ) {
          style = "attribute-small-selected";
        }
      }
    }
    return (
      <button
        className={style}
        onClick={() => {
          this.props.attributeClick(
            this.props.productId,
            this.props.name,
            this.props.value
          );
        }}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Attribute;
