import React, { PureComponent } from "react";
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

class Swatch extends PureComponent {
  render() {
    const {
      name,
      displayValue,
      value,
      id,
      productId,
      attributes,
      swatchClick,
      compSize,
    } = this.props;
    let check;
    attributes.forEach((attribute) => {
      if (attribute[0] === "Color") {
        check = attribute[1];
      }
    });
    return (
      <div
        className={compSize === "large" ? "swatch-large" : "swatch-small"}
        onClick={() => {
          swatchClick(productId, name, value);
        }}
      >
        <StyledSwatch value={value} />
        <div
          className={`swatch-overlay ${
            value === check ? "swatch-overlay-visible" : ""
          }`}
        >
          <StyledCheck id={id}>&#10003;</StyledCheck>
        </div>
      </div>
    );
  }
}

export default Swatch;
