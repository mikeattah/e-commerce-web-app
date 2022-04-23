import React, { Component } from "react";
import { nanoid } from "nanoid";
import "./Pagination.css";

class Pagination extends Component {
  pageClick = (page) => {
    this.props.pageClick(page);
  };

  render() {
    return (
      <div className="pagination">
        <button
          onClick={() => this.pageClick(this.props.pages[0])}
          className="pagination-button"
          disabled={this.props.pageIndex === this.props.pages[0] ? true : false}
        >
          &#8810;
        </button>
        <button
          onClick={() =>
            this.pageClick(this.props.pageIndex - this.props.pageItems)
          }
          className="pagination-button"
          disabled={this.props.pageIndex === this.props.pages[0] ? true : false}
        >
          &#60;
        </button>
        {this.props.pages.map((page) => {
          return (
            <button
              onClick={() => this.pageClick(page * this.props.pageItems)}
              className={`pagination-button ${
                this.props.pageIndex === this.props.pageItems * page
                  ? "pagination-button-active"
                  : ""
              }`}
              key={nanoid()}
            >
              {page + 1}
            </button>
          );
        })}
        <button
          onClick={() =>
            this.pageClick(this.props.pageIndex + this.props.pageItems)
          }
          className="pagination-button"
          disabled={
            this.props.pageIndex ===
            this.props.pages[this.props.pages.length - 1] * this.props.pageItems
              ? "true"
              : ""
          }
        >
          &#62;
        </button>
        <button
          onClick={() =>
            this.pageClick(
              this.props.pages[this.props.pages.length - 1] *
                this.props.pageItems
            )
          }
          className="pagination-button"
          disabled={
            this.props.pageIndex ===
            this.props.pages[this.props.pages.length - 1] * this.props.pageItems
              ? "true"
              : ""
          }
        >
          &#8811;
        </button>
      </div>
    );
  }
}

export default Pagination;
