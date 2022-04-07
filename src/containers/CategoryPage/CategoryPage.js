import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import { CategoryPageHOC } from "../../hoc/CategoryPageHOC";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.categories = props.categories;
    this.category = props.category;
    this.state = {
      pageIndex: 0,
    };
    // array of categories
    this.categoryNames = [];
    // array of pages
    this.pages = [];

    this.handlePageIndex = this.handlePageIndex.bind(this);
  }

  componentDidMount() {
    // collect all category names into categoryNames array
    this.categories.forEach((category) => {
      this.categoryNames.push(category.name);
    });

    // number of items per page
    let pageItems = 4;

    // index of category in category names array
    let i = this.categoryNames.indexOf(this.category);

    // number of pages
    let pageCount = Math.ceil(this.categories[i].products.length / pageItems);

    // collect page indexes into pages array
    for (let j = 0; j <= pageCount; j++) {
      this.pages.push(j);
    }
  }

  handlePageIndex(index) {
    this.setState({ pageIndex: index });
  }

  render() {
    // index of category in category names array
    let k = this.categoryNames.indexOf(this.category);
    // category name
    let name = this.category;
    // category products (array)
    let products = this.categories[k].products;
    return (
      <div className="container">
        <h1 className="title">{name}</h1>
        <div className="main-container">
          {products.map((product) => {
            let { id, name, inStock, gallery, prices } = product;
            let { currency, amount } = prices;
            let { label, symbol } = currency;
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
                onClick={() => {}}
              />
            );
          })}
        </div>
        <Pagination pages={this.pages} onClick={this.handlePageIndex} />
      </div>
    );
  }
}

export default CategoryPageHOC(CategoryPage);
