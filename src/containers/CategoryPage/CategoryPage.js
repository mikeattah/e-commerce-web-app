import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import { CategoryPageHOC } from "../../hoc/CategoryPageHOC";

class CategoryPage extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">{this.props.name}</h1>
        <div className="main-container">
          {this.props.products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                inStock={product.inStock}
                gallery={product.gallery}
                prices={product.prices}
                onClick={() => {}}
              />
            );
          })}
        </div>
        <Pagination
          pages={this.props.pages}
          setPageIndex={this.props.setPageIndex}
        />
      </div>
    );
  }
}

export default CategoryPageHOC(CategoryPage);
