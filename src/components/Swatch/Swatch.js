import React, { Component } from "react";
import styled from "styled-components";

const StyledSwatch = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.value};
`;

const StyledCheck = styled.span`
  color: ${(props) => (props.id === "White" ? "#000" : "#fff")};
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
        onClick={() =>
          this.props.swatchClick(this.props.name, this.props.value)
        }
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
