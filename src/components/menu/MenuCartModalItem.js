import style from "./MenuCartModalItem.module.css";

import Button from "../UI/Button";
import { cartContext } from "../../store/CartContext";

import { useContext } from "react";

export default function MenuCartModalItem(props) {
  const cartCtx = useContext(cartContext);
  
  function addOneButtonHander() {
    cartCtx.dispatchCart({ type: "ADD", item: { id: props.item.id, quantity: 1 } });
  }

  function removeOneButtonHander() {
    cartCtx.dispatchCart({ type: "REMOVE", item: { id: props.item.id, quantity: 1 } });
  }

  return (
    <div key={props.item.id} className={style["modal-item"]}>
      <img alt="Ordered Item" src={props.item.imgUrl}></img>
      <div className={style["modal-item-info"]}>
        <h3>{props.item.name}</h3>
        <span className={style["item-price"]}>{"$" + props.item.price}</span>
        <span className={style["item-amount"]}>{"x " + props.item.amount}</span>
      </div>
      <div className={style["item-actions"]}>
        <Button type="button" look="primary" onClick={addOneButtonHander}>
          +
        </Button>
        <Button type="button" look="secondary" onClick={removeOneButtonHander}>
          -
        </Button>
      </div>
    </div>
  );
}
