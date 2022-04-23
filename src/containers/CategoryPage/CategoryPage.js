import React, { Component } from "react";
import { gql } from "@apollo/client";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import "./CategoryPage.css";

const GET_ALL_CATEGORIES_PRODUCTS = gql`
  query GetAllCategoriesProducts {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      categories: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: GET_ALL_CATEGORIES_PRODUCTS,
      })
      .then((response) => {
        this.setState((prevState) => ({
          categories: [...prevState.categories, ...response.data.categories],
          loading: false,
        }));
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  handlePageClick = (index) => {
    this.setState({ pageIndex: index });
  };

  handleCategoryPageAddToCart = (id, attributes) => {
    let categories = this.state.categories;
    for (let category of categories) {
      for (let product of category.products) {
        if (product.id === id) {
          this.props.addToCart(product, attributes);
          return;
        }
      }
    }
  };

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    if (this.state.error) return <p>Error: {this.state.error}</p>;
    // array of all category names
    const categoryNames = this.state.categories.map(
      (category) => category.name
    );
    // number of items per page
    let pageItems = 6;
    // array of pages
    const pages = [];
    // index of category in categoryNames array
    let i = categoryNames.indexOf(this.props.category);
    // number of pages per category
    let pageCount = Math.ceil(
      this.state.categories[i].products.length / pageItems
    );
    // collect page indexes into pages array
    for (let j = 0; j < pageCount; j++) {
      pages.push(j);
    }
    return (
      <div className="category-page">
        <h1 className="category-page-title">
          {this.props.category.toUpperCase()}
        </h1>
        <div className="category-page-main">
          {[
            ...this.state.categories[i].products.slice(
              this.state.pageIndex,
              this.state.pageIndex + pageItems
            ),
          ].map((product) => {
            let { id, name, inStock, gallery, attributes, prices } = product;
            let label, symbol, amount;
            for (let price of prices) {
              if (price.currency.label === this.props.currency) {
                label = price.currency.label;
                symbol = price.currency.symbol;
                amount = price.amount;
              }
            }
            return (
              <ProductCard
                key={id}
                id={id}
                name={name}
                inStock={inStock}
                gallery={gallery}
                attributes={attributes}
                label={label}
                symbol={symbol}
                amount={amount}
                productClick={this.props.productClick}
                categoryPageAddToCart={this.handleCategoryPageAddToCart}
              />
            );
          })}
        </div>
        <Pagination
          pages={pages}
          pageIndex={this.state.pageIndex}
          pageItems={pageItems}
          pageClick={this.handlePageClick}
        />
        <div
          className={
            this.props.miniCartOpen
              ? "category-page-overlay"
              : "category-page-overlay-hidden"
          }
          onClick={() => this.props.miniCartToggle()}
        ></div>
      </div>
    );
  }
}

export default CategoryPage;
