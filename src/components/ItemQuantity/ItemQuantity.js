import React, { Component } from "react";

class ItemQuantity extends Component {
  render() {
    return (
      <div className="container">
        <button className="button" onClick={this.props.onClick}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default ItemQuantity;
