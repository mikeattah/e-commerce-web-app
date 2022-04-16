import React, { Component } from "react";
import "./Quantity.css";

class Quantity extends Component {
  render() {
    return (
      <button
        className={
          this.props.compSize === "large" ? "quantity-large" : "quantity-small"
        }
        onClick={() => this.props.buttonClick()}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Quantity;
