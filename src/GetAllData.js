import { gql } from "@apollo/client";

const GetAllData = gql`
  query GetAllData {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
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
        brand
      }
    }
    currencies {
      label
      symbol
    }
    cartItems @client
  }
`;

export default GetAllData;
