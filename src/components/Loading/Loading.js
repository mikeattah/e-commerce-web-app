import React, { PureComponent } from "react";
import "./Loading.css";

class Loading extends PureComponent {
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
