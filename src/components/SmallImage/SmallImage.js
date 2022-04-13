import React, { Component } from "react";
import "./SmallImage.css";

class SmallImage extends Component {
  render() {
    return (
      <img
        src={this.props.src}
        alt={this.props.alt}
        className="small-image"
        onClick={this.props.imageClick}
      />
    );
  }
}

export default SmallImage;
