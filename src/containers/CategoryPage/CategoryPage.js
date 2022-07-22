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
    const {
      currency,
      category,
      categories,
      categoryNames,
      miniCartOpen,
      productClick,
      addToCart,
      miniCartToggle,
      numberFormat,
    } = this.props;
    const { pageIndex } = this.state;
    // number of items per page
    const pageItems = 6;
    // array of pages
    const pages = [];
    // index of category in categoryNames array
    const i = categoryNames.indexOf(category);
    // number of pages per category
    const pageCount = Math.ceil(categories[i].products.length / pageItems);
    // collect page indexes into pages array
    for (let j = 0; j < pageCount; j++) {
      pages.push(j);
    }
    return (
      <div className="category-page">
        <h1 className="category-page-title">{category.toUpperCase()}</h1>
        <div className="category-page-main">
          {[
            ...categories[i].products.slice(pageIndex, pageIndex + pageItems),
          ].map((product) => {
            const {
              id: productId,
              name,
              inStock,
              gallery,
              attributes,
              prices,
              brand,
            } = product;
            let label, symbol, amount;
            for (const price of prices) {
              if (price.currency.label === currency) {
                label = price.currency.label;
                symbol = price.currency.symbol;
                amount = numberFormat(price.amount);
              }
            }
            return (
              <ProductCard
                key={nanoid()}
                productId={productId}
                name={name}
                inStock={inStock}
                gallery={gallery}
                attributes={attributes}
                label={label}
                symbol={symbol}
                amount={amount}
                brand={brand}
                productClick={productClick}
                addToCart={addToCart}
              />
            );
          })}
        </div>
        <Pagination
          pages={pages}
          pageIndex={pageIndex}
          pageItems={pageItems}
          pageClick={this.handlePageClick}
        />
        <div
          className={
            miniCartOpen
              ? "category-page-overlay"
              : "category-page-overlay-hidden"
          }
          onClick={() => miniCartToggle()}
        ></div>
      </div>
    );
  }
}

export default CategoryPage;
