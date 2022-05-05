import React, { PureComponent } from "react";
import { nanoid } from "nanoid";
import "./Pagination.css";

class Pagination extends PureComponent {
  pageClick = (page) => {
    this.props.pageClick(page);
  };

  render() {
    const { pages, pageIndex, pageItems, pageClick } = this.props;
    return (
      <div className="pagination">
        <button
          onClick={() => this.pageClick(pages[0])}
          className="pagination-button"
          disabled={pageIndex === pages[0] ? true : false}
        >
          &#8810;
        </button>
        <button
          onClick={() =>
            this.pageClick(pageIndex - pageItems)
          }
          className="pagination-button"
          disabled={pageIndex === pages[0] ? true : false}
        >
          &#60;
        </button>
        {pages.map((page) => {
          return (
            <button
              onClick={() => this.pageClick(page * pageItems)}
              className={`pagination-button ${
                pageIndex === pageItems * page
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
            this.pageClick(pageIndex + pageItems)
          }
          className="pagination-button"
          disabled={
            pageIndex ===
            pages[pages.length - 1] * pageItems
              ? "true"
              : ""
          }
        >
          &#62;
        </button>
        <button
          onClick={() =>
            this.pageClick(
              pages[pages.length - 1] *
                pageItems
            )
          }
          className="pagination-button"
          disabled={
            pageIndex ===
            pages[pages.length - 1] * pageItems
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
