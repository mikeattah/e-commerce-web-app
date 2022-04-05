import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import { CategoryPageHOC } from "../../hoc/CategoryPageHOC";

class CategoryPage extends Component {
  render() {
    if (this.props.loading) return <p>Loading...</p>;

    if (this.props.error) return <p>Error :(</p>;

    return (
      <div className="container">
        <h1 className="title">Category Name</h1>
        <div className="main-container">
          {this.props.data.map((product) => {
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
        <Pagination pages={this.props.pages} />
      </div>
    );
  }
}

export default CategoryPageHOC(CategoryPage);
