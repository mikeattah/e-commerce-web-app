import React, { Component } from "react";

class ProductSize extends Component {
  constructor(props) {
    super(props);
    this.displayValue = props.displayValue;
    this.value = props.value;
  }
  render() {
    return (
      <button
        className="button"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default ProductSize;
