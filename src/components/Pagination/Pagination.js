import React, { Component } from "react";
import ProductSize from "../ProductSize/ProductSize";

class Pagination extends Component {
  render() {
    return (
      <div className="container">
        {pages.map((page) => {
          <ProductSize title={page.number} />;
        })}
      </div>
    );
  }
}

export default Pagination;
