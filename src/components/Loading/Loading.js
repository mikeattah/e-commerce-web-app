import React, { Component } from "react";
import "./Loading.css";

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <img
          src="/loading-spinner.gif"
          alt="Please wait..."
          className="loading"
        />
      </div>
    );
  }
}

export default Loading;
