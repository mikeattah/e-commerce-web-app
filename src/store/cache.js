import { InMemoryCache } from "@apollo/client";
import cartItemsVar from "./cartItemsVar";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
      },
    },
  },
});

export default cache;
