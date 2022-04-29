const initialCartItems =
  JSON.parse(window.localStorage.getItem("eCommerceWebApp.cartItems")) || [];

export default initialCartItems;
