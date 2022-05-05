import React, { PureComponent } from "react";
import { nanoid } from "nanoid";
import "./DropDown.css";

class DropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "$",
      dropDownOpen: false,
    };
  }

  handleDropDownClose = () => {
    this.setState({
      dropDownOpen: false,
    });
  };

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.dropDownOpen) {
        window.addEventListener("click", this.handleDropDownClose);
      } else {
        window.removeEventListener("click", this.handleDropDownClose);
      }
    }, 0);
  }

  handleDropDownToggle = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
    });
  };

  handleSelectedItem = (label, symbol) => {
    this.setState(
      {
        title: symbol,
        dropDownOpen: true,
      },
      () => {
        this.props.dropDownClick(label);
      }
    );
  };

  render() {
    const { items, dropDownClick } = this.props;
    const { title, dropDownOpen } = this.state;
    return (
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={this.handleDropDownToggle}>
          <span>{title}</span>
          {dropDownOpen ? <span>&#65087;</span> : <span>&#65088;</span>}
        </div>
        <div
          className={`dropdown-list ${
            dropDownOpen ? "" : "dropdown-list-hidden"
          }`}
        >
          {items.map((item) => {
            const { label, symbol } = item;
            return (
              <button
                key={nanoid()}
                className={`dropdown-list-item ${
                  title === symbol ? "dropdown-list-item-selected" : ""
                }`}
                onClick={() => this.handleSelectedItem(label, symbol)}
              >
                {symbol} {label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DropDown;
