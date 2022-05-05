import React, { PureComponent } from "react";
import "./SmallImage.css";

class SmallImage extends PureComponent {
  render() {
    const { src, alt, imageClick, currentImage } = this.props;
    return (
      <div
        className="small-image-container"
        onClick={() => imageClick(src)}
      >
        <img
          src={src}
          alt={alt}
          className="small-image"
        />
        <div
          className={`small-image-overlay ${
            currentImage === src
              ? "small-image-overlay-selected"
              : ""
          }`}
        ></div>
      </div>
    );
  }
}

export default SmallImage;
