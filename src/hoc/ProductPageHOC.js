import React from "react";
import { useQuery, gql } from "@apollo/client";

export const ProductPageHOC = (Component) => {
  const PRODUCT = gql`
    query GetProductDetails($id: ID!) {
      product(id: $id) {
        id
        name
        inStock
        gallery
        description
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

  const sizes = [
    {
      label: "S",
      value: "S",
    },
    {
      label: "M",
      value: "M",
    },
    {
      label: "L",
      value: "L",
    },
    {
      label: "XL",
      value: "XL",
    },
  ];

  return (props) => {
    const { id } = props;
    const { loading, error, data } = useQuery(PRODUCT, {
      variables: { id },
    });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    const product = data.product;

    return <Component product={product} sizes={sizes} {...props} />;
  };
};
