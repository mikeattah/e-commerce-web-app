import React, { Component } from "react";

class ProductSize extends Component {
  constructor(props) {
    super(props);
    this.displayValue = props.displayValue;
    this.value = props.value;
    this.onClick = props.onClick;
  }
  render() {
    return (
      <button className="button" onClick={() => this.onClick(this.value)}>
        {this.displayValue}
      </button>
    );
  }
}

export default ProductSize;
