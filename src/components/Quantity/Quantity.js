import React, { PureComponent } from "react";
import "./Quantity.css";

class Quantity extends PureComponent {
  render() {
    const { children, compSize, type, cartItemId, quantityClick } = this.props;
    return (
      <button
        className={compSize === "large" ? "quantity-large" : "quantity-small"}
        onClick={() => quantityClick(cartItemId, type)}
      >
        {children}
      </button>
    );
  }
}

export default Quantity;
