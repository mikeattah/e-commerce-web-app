import React, { PureComponent } from "react";
import styled from "styled-components";
import "./Swatch.css";

const StyledSwatch = styled.div`
  height: 100%;
  width: 100%;
  background: ${(props) => props.value};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`;

class Swatch extends PureComponent {
  render() {
    const { name, value, itemId, attributes, swatchClick, compSize } =
      this.props;
    let selected;
    attributes.forEach((attribute) => {
      if (attribute[0] === "Color") {
        selected = attribute[1];
      }
    });
    let style = compSize === "large" ? "swatch-large" : "swatch-small";
    if (value === selected) {
      style = `${style} swatch-selected`;
    }
    return (
      <div
        className={style}
        onClick={() => {
          swatchClick(itemId, name, value);
        }}
      >
        <StyledSwatch value={value} />
      </div>
    );
  }
}

export default Swatch;
