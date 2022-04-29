import React, { Component } from "react";
import styled from "styled-components";
import "./Swatch.css";

const StyledSwatch = styled.div`
  height: 100%;
  width: 100%;
  background: ${(props) => props.value};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`;

const StyledCheck = styled.span`
  color: ${(props) => (props.id === "White" ? "black" : "white")};
`;

class Swatch extends Component {
  render() {
    let check,
      attributes = this.props.attributes;
    for (let attribute of attributes) {
      if (attribute[0] === "Color") {
        check = attribute[1];
      }
    }
    return (
      <div
        className={
          this.props.compSize === "large" ? "swatch-large" : "swatch-small"
        }
        onClick={() => {
          this.props.swatchClick(
            this.props.productId,
            this.props.name,
            this.props.value
          );
        }}
      >
        <StyledSwatch value={this.props.value} />
        <div
          className={`swatch-overlay ${
            this.props.value === check ? "swatch-overlay-visible" : ""
          }`}
        >
          <StyledCheck id={this.props.id}>&#10003;</StyledCheck>
        </div>
      </div>
    );
  }
}

export default Swatch;
