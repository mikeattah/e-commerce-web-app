import React, { Component } from "react";
import "./Attribute.css";

class Attribute extends Component {
  render() {
    let style;
    if (this.props.compSize === "large") {
      for (let attribute of this.props.attributes) {
        if (
          this.props.name === attribute[0] &&
          this.props.value === attribute[1]
        ) {
          style = "attribute-large-active";
        } else {
          style = "attribute-large";
        }
      }
    } else {
      for (let attribute of this.props.attributes) {
        if (
          this.props.name === attribute[0] &&
          this.props.value === attribute[1]
        ) {
          style = "attribute-small-active";
        } else {
          style = "attribute-small";
        }
      }
    }

    return (
      <button
        className={style}
        onClick={() =>
          this.props.attributeClick(this.props.name, this.props.value)
        }
      >
        {this.props.displayValue}
      </button>
    );
  }
}

export default Attribute;
