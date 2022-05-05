import React, { Component } from "react";
import { nanoid } from "nanoid";
import Pagination from "../../components/Pagination/Pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./CategoryPage.css";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    };
  }

  handlePageClick = (index) => {
    this.setState({ pageIndex: index });
  };

  render() {
    // number of items per page
    const pageItems = 6;
    // array of pages
    const pages = [];
    // index of category in categoryNames array
    const i = this.props.categoryNames.indexOf(this.props.category);
    // number of pages per category
    const pageCount = Math.ceil(
      this.props.categories[i].products.length / pageItems
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
            ...this.props.categories[i].products.slice(
              this.state.pageIndex,
              this.state.pageIndex + pageItems
            ),
          ].map((product) => {
            const { id, name, inStock, gallery, attributes, prices, brand } =
              product;
            let label, symbol, amount;
            for (let price of prices) {
              if (price.currency.label === this.props.currency) {
                label = price.currency.label;
                symbol = price.currency.symbol;
                amount = this.props.numberFormat(price.amount);
              }
            }
            return (
              <ProductCard
                key={nanoid()}
                id={id}
                name={name}
                inStock={inStock}
                gallery={gallery}
                attributes={attributes}
                label={label}
                symbol={symbol}
                amount={amount}
                brand={brand}
                productClick={this.props.productClick}
                addToCart={this.props.addToCart}
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
