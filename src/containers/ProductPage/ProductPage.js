import React, { Component } from "react";
import { useQuery, gql } from "@apollo/client";
import SmallImage from "../../components/SmallImage/SmallImage";
import ProductSize from "../../components/ProductSize/ProductSize";
import FillButton from "../../components/FillButton/FillButton";

const PRODUCT = gql`
  query GetProduct($id: ID!) {
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

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: props.id,
        name: props.name,
        title: props.title,
        type: props.type,
        gallery: props.gallery,
        description: props.description,
        prices: props.prices,
      },
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const { loading, error, data } = useQuery(PRODUCT, {
      variables: { id },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    this.setState({ product: data.product });
  }

  handleImageToggle() {}

  render() {
    return (
      <div className="container">
        <div className="small-images-container">
          {this.state.product.gallery.map((image) => {
            return (
              <SmallImage
                src={image.src}
                alt="click to view"
                key={image.id}
                className="small-image"
                onClick={this.handleImageToggle}
              />
            );
          })}
        </div>
        <img
          src={this.state.product.gallery[0].src}
          alt="Enlarged product"
          className="large-image"
        />
        <div className="product-details">
          <h3 className="product-title">{this.state.product.name}</h3>
          <p className="product-type">{this.state.product.type}</p>
          <div>
            <p className="product-size">SIZE:</p>
            {sizes.map((size) => {
              return <ProductSize key={size.id} title={size.label} />;
            })}
          </div>
          <p className="product-price">PRICE:</p>
          <p className="product-price">{this.state.product.prices}</p>
        </div>
        <FillButton onClick={() => {}}>ADD TO CART</FillButton>
        <p className="product-description">{this.state.product.description}</p>
      </div>
    );
  }
}

export default ProductPage;
