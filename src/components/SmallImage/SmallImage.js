import React, { Component } from "react";
import "./SmallImage.css";

class SmallImage extends Component {
  render() {
    return (
      <div
        className="small-image-container"
        onClick={() => this.props.imageClick(this.props.src)}
      >
        <img
          src={this.props.src}
          alt={this.props.alt}
          className="small-image"
        />
        <div
          className={`small-image-overlay ${
            this.props.currentImage === this.props.src
              ? "small-image-overlay-selected"
              : ""
          }`}
        ></div>
      </div>
    );
  }
}

export default SmallImage;
