import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";

class CategoryPage extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">Category Name</h1>
        <div className="main-container">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                onClick={() => {}}
              />
            );
          })}
        </div>
        <Pagination />
      </div>
    );
  }
}

export default CategoryPage;
