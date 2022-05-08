import React, { PureComponent } from "react";
import "./Attribute.css";

class Attribute extends PureComponent {
  render() {
    const { name, value, productId, attributes, attributeClick, compSize } =
      this.props;
    let style = compSize === "large" ? "attribute-large" : "attribute-small";
    attributes.forEach((attribute) => {
      if (name === attribute[0] && value === attribute[1]) {
        style = `${style} attribute-selected`;
      }
    });
    return (
      <button
        className={style}
        onClick={() => {
          attributeClick(productId, name, value);
        }}
      >
        {value}
      </button>
    );
  }
}

export default Attribute;
