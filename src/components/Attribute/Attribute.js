import React, { PureComponent } from "react";
import "./Attribute.css";

class Attribute extends PureComponent {
  render() {
    const {
      name,
      displayValue,
      value,
      id,
      productId,
      attributes,
      attributeClick,
      compSize,
    } = this.props;
    let style =
      compSize === "large" ? "attribute-large" : "attribute-small";
    if (compSize === "large") {
      for (const attribute of attributes) {
        if (
          name === attribute[0] &&
          value === attribute[1]
        ) {
          style = "attribute-large-selected";
        }
      }
    } else {
      for (const attribute of attributes) {
        if (
          name === attribute[0] &&
          value === attribute[1]
        ) {
          style = "attribute-small-selected";
        }
      }
    }
    return (
      <button
        className={style}
        onClick={() => {
          attributeClick(
            productId,
            name,
            value
          );
        }}
      >
        {value}
      </button>
    );
  }
}

export default Attribute;
