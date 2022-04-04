import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";

const CATEGORY_PRODUCTS = gql`
  query GetCategories {
    name
    products {
      id
      name
      inStock
      gallery
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

const { loading, error, data } = useQuery(CATEGORY_PRODUCTS);

// number of items per page
const pageItems = 4;
// number of pages
let pageCount = Math.ceil(data.products.length / pageItems);
// array of pages
const pages = [];

for (let i = 1; i <= pageCount; i++) {
  pages.push(i);
}
class CategoryPage extends Component {
  render() {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <div className="container">
        <h1 className="title">Category Name</h1>
        <div className="main-container">
          {data.map((product) => {
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
        <Pagination pages={pages} />
      </div>
    );
  }
}

export default CategoryPage;
