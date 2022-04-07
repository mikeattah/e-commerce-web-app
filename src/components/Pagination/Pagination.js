import React, { Component } from "react";
import ProductSize from "../ProductSize/ProductSize";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.pages = props.pages;
    this.onClick = props.onClick;
  }

  render() {
    return (
      <div className="container">
        {this.pages.map((page) => {
          return <ProductSize title={page} onClick={this.onClick(page)} />;
        })}
      </div>
    );
  }
}

export default Pagination;
