import React, { PureComponent } from "react";
import "./Error.css";

class Error extends PureComponent {
  render() {
    const { error } = this.props;
    return (
      <div className="error-container">
        <div className="error-box">
          <div className="error-image-container">
            <img
              src="/error.png"
              alt="Error loading page! Error icons created by Freepik - Flaticon: https://www.flaticon.com/free-icons/error"
              className="error-image"
            />
          </div>
          <div className="error-text-container">
            <h1 className="error-title">Something went terribly wrong!</h1>
            <p className="error-text">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
