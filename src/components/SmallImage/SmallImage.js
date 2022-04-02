import React, { Component } from "react";

class SmallImage extends Component {
  render() {
    return (
      <img
        className="image"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      />
    );
  }
}

export default SmallImage;
