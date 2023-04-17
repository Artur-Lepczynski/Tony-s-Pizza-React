import style from "./MenuItem.module.css";

import React, { useContext, useState } from "react";

import Button from "../UI/Button";

import { cartContext } from "../../store/CartContext";

export default function MenuItem(props) {
  const [quantity, setQuantity] = useState(0);

  const cartCtx = useContext(cartContext);

  function handleQuantityChange(event) {
    const value = event.target.value;
    if (value < 0 || value > 5 || value === "") {
      setQuantity(0);
      return;
    }
    setQuantity(Number.parseInt(event.target.value));
  }

  function handleAddClick() {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 4) return prevQuantity;
      return prevQuantity + 1;
    });
  }

  function handleMinusClick() {
    setQuantity((prevQuantity) => {
      if (prevQuantity <= 0) return prevQuantity;
      return prevQuantity - 1;
    });
  }

  function handleAddToCart() {
    if (quantity === 0) return;
    // console.log("Add to cart " + props.id + " " + quantity);
    cartCtx.dispatchCart({type: "ADD", item: {id: props.id, quantity}});
    setQuantity(0);
  }

  return (
    <div className={style["main-wrapper"]}>
      <img alt="" src={props.url}></img>
      <div className={style["menu-text"]}>
        <h3>{props.name + ` - $${props.price}`}</h3>
        <p>{props.description}</p>
      </div>
      <div className={style["menu-controls"]}>
        <input
          type="number"
          min="0"
          max="5"
          value={quantity}
          onChange={handleQuantityChange}
        ></input>
        <div className={style["menu-buttons"]}>
          <Button type="button" look="secondary" onClick={handleMinusClick}>
            -
          </Button>
          <Button type="button" look="primary" onClick={handleAddClick}>
            +
          </Button>
        </div>
        <Button
          className={style["button-add"]}
          type="button"
          look="primary"
          onClick={handleAddToCart}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
