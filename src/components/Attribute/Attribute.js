import React, { PureComponent } from "react";
import "./Attribute.css";

class Attribute extends PureComponent {
  render() {
    const { name, value, itemId, attributes, attributeClick, compSize } =
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
          attributeClick(itemId, name, value);
        }}
      >
        {value}
      </button>
    );
  }
}

export default Attribute;
