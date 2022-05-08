import React, { PureComponent } from "react";
import { nanoid } from "nanoid";
import "./Pagination.css";

class Pagination extends PureComponent {
  pageClick = (page) => {
    this.props.pageClick(page);
  };

  render() {
    const { pages, pageIndex, pageItems } = this.props;
    const { pageClick } = this;
    return (
      <div className="pagination">
        <button
          onClick={() => pageClick(pages[0])}
          className="pagination-button"
          disabled={pageIndex === pages[0] ? true : false}
        >
          &#8810;
        </button>
        <button
          onClick={() => pageClick(pageIndex - pageItems)}
          className="pagination-button"
          disabled={pageIndex === pages[0] ? true : false}
        >
          &#60;
        </button>
        {pages.map((page) => {
          return (
            <button
              onClick={() => pageClick(page * pageItems)}
              className={`pagination-button ${
                pageIndex === pageItems * page ? "pagination-button-active" : ""
              }`}
              key={nanoid()}
            >
              {page + 1}
            </button>
          );
        })}
        <button
          onClick={() => pageClick(pageIndex + pageItems)}
          className="pagination-button"
          disabled={
            pageIndex === pages[pages.length - 1] * pageItems ? "true" : ""
          }
        >
          &#62;
        </button>
        <button
          onClick={() => pageClick(pages[pages.length - 1] * pageItems)}
          className="pagination-button"
          disabled={
            pageIndex === pages[pages.length - 1] * pageItems ? "true" : ""
          }
        >
          &#8811;
        </button>
      </div>
    );
  }
}

export default Pagination;
