import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Pagination from "../../components/Pagination/Pagination";
import ProductCard from "../../components/ProductCard/ProductCard";

class CategoryPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>Category Name</h1>
        <div>
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
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
