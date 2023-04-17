import Card from "../UI/Card";
import style from "./MenuCartModal.module.css";
import { useContext } from "react";
import { cartContext } from "../../store/CartContext";
import Button from "../UI/Button";
import MenuCartModalItem from "./MenuCartModalItem";
import { useSubmit } from "react-router-dom";

export default function MenuCartModal(props) {
  const cartCtx = useContext(cartContext);

  const submit = useSubmit();

  const orderedItems = cartCtx.cart.items.map((item) => {
    const orderedCategory = props.menu.find((category) => {
      return category.items.find((categoryItem) => {
        return item.id === categoryItem.id;
      });
    });

    const orderedItem = orderedCategory.items.find((categoryItem) => {
      return item.id === categoryItem.id;
    });

    return {
      amount: item.amount,
      name: orderedItem.name,
      price: orderedItem.price,
      id: item.id,
      imgUrl: orderedItem.imgUrl,
    };
  });

  function handleOrder() {
    console.log("Ordering");
    props.onClose(); 
    submit(null, { method: "post" });
  }

  return (
    <div className={style["modal-wrapper"]}>
      <Card className={style["modal"]}>
        <div className={style["modal-header"]}>
          <h2>Your Cart</h2>
        </div>

        <div className={style["modal-items"]}>
          {orderedItems.length > 0 ? (
            orderedItems.map((item) => {
              return <MenuCartModalItem key={item.id} item={item} />;
            })
          ) : (
            <p className={style["modal-empty"]}>Your cart is empty! </p>
          )}
        </div>

        <div className={style["modal-footer"]}>
          <div className={style["modal-total"]}>
            <span>Total</span>
            <span>{"$" + cartCtx.cart.priceTotal}</span>
          </div>

          <div className={style["modal-actions"]}>
            <Button type="button" look="secondary" onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              look="primary"
              disabled={orderedItems.length === 0}
              onClick={handleOrder}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
