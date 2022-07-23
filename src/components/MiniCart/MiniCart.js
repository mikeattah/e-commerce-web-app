import React, { PureComponent } from "react";
import { nanoid } from "nanoid";
import FillButton from "../FillButton/FillButton";
import CartItem from "../CartItem/CartItem";
import OutlineButton from "../OutlineButton/OutlineButton";
import "./MiniCart.css";

class MiniCart extends PureComponent {
  render() {
    const {
      currency,
      currencies,
      cartItems,
      subTotal,
      cartQuantity,
      miniCartOpen,
      getProduct,
      cartItemAttributes,
      cartItemQuantity,
      removeFromCart,
      viewBag,
      placeOrder,
      numberFormat,
    } = this.props;
    let symbol;
    currencies.forEach((currency) => {
      if (currency.label === currency) {
        symbol = currency.symbol;
      }
    });
    return (
      <div className={`mini-cart ${miniCartOpen ? "" : "mini-cart-hidden"}`}>
        <p className="mini-cart-title">
          <span className="mini-cart-title-span">My Bag,</span> {cartQuantity}{" "}
          {cartQuantity > 1 ? "items" : "item"}
        </p>
        <div className="mini-cart-items-container">
          {cartItems.map((item) => {
            const { productId, cartItemId, attributes, quantity } = item;
            const product = getProduct(productId);
            return (
              <CartItem
                key={nanoid()}
                product={product}
                cartItemId={cartItemId}
                attributes={attributes}
                cartItemAttributes={cartItemAttributes}
                quantity={quantity}
                cartItemQuantity={cartItemQuantity}
                removeFromCart={removeFromCart}
                currency={currency}
                numberFormat={numberFormat}
                compSize="small"
              />
            );
          })}
        </div>
        <div className="mini-cart-total-price">
          <span>Total:</span>
          <span>
            {symbol} {subTotal}
          </span>
        </div>
        <div className="mini-cart-buttons">
          <OutlineButton
            buttonClick={viewBag}
            compSize="small"
            disabled={false}
          >
            VIEW BAG
          </OutlineButton>
          <FillButton
            buttonClick={placeOrder}
            compSize="small"
            disabled={false}
          >
            CHECK OUT
          </FillButton>
        </div>
      </div>
    );
  }
}

export default MiniCart;
