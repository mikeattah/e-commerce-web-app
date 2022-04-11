import React, { Component } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import { CategoryPageHOC } from "../../hoc/CategoryPageHOC";
import "./CategoryPage.css";
class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(index) {
    this.setState({ pageIndex: index });
  }

  render() {
    // array of all category names
    const categoryNames = this.props.categories.map((category) => {
      return category.name;
    });

    // number of items per page
    let pageItems = 6;

    // array of pages
    const pages = [];

    // index of category in categoryNames array
    let i = categoryNames.indexOf(this.props.category);

    // number of pages per category
    let pageCount = Math.ceil(
      this.props.categories[i].products.length / pageItems
    );

    // collect page indexes into pages array
    for (let j = 0; j < pageCount; j++) {
      pages.push(j);
    }

    console.log(categoryNames, pages);

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
            let { id, name, inStock, gallery, prices } = product;
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
                label={label}
                symbol={symbol}
                amount={amount}
                productClick={this.props.productClick}
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
      </div>
    );
  }
}

export default CategoryPageHOC(CategoryPage);
