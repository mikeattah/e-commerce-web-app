import React, { Component } from "react";
import "./Error.css";

class Error extends Component {
  render() {
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
            <p className="error-text">{this.props.error.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
