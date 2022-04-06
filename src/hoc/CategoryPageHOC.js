import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

export const CategoryPageHOC = (Component) => {
  const CATEGORY_PRODUCTS = gql`
    query GetAllCategoriesAndProducts {
      categories {
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
    }
  `;

  return (props) => {
    const [category, setCategory] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);

    const { loading, error, data } = useQuery(CATEGORY_PRODUCTS);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    // number of items per page
    const pageItems = 4;
    // number of pages
    let pageCount = Math.ceil(data.categories[0].products.length / pageItems);
    // array of pages
    const pages = [];

    for (let i = 0; i <= pageCount; i++) {
      pages.push(i);
    }

    const name = data.categories[0].name;
    const products = data.categories[0].products;

    return (
      <Component
        name={name}
        products={products}
        pages={pages}
        setPageIndex={setPageIndex}
        {...props}
      />
    );
  };
};
