import { useLoaderData, useSubmit } from "react-router-dom";
import style from "./Checkout.module.css";
import { cartContext } from "../../store/CartContext";

import { useContext, useState } from "react";
import Page from "../UI/Page";
import Card from "../UI/Card";
import Button from "../UI/Button";

export default function Checkout() {
  const { menu, userData } = useLoaderData();

  const submit = useSubmit();

  const [payment, setPayment] = useState("cash");

  const cartCtx = useContext(cartContext);

  const orderedItems = cartCtx.cart.items.map((item) => {
    const orderedCategory = menu.find((category) => {
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

  function handlePaymentCHange(event) {
    setPayment(event.target.value);
  }

  function handleOrder() {
    cartCtx.dispatchCart({ type: "ORDER", action: { paymentMethod: payment } });
    submit(null, { method: "post"});
  }

  return (
    <Page className={style["page"]}>
      <Card className={style.wrapper}>
        <h2>Checkout</h2>
        <div className={style.info}>
          <div className={style["user-info"]}>
            <h2>Your information</h2>
            <div className={style["user-info-item"]}>
              <p>Name:</p>
              <p>{userData.name}</p>
            </div>
            <div className={style["user-info-item"]}>
              <p>Last Name:</p>
              <p>{userData.lastName}</p>
            </div>
            <div className={style["user-info-item"]}>
              <p>Email:</p>
              <p>{userData.email}</p>
            </div>
            <div className={style["user-info-item"]}>
              <p>Delivery Address:</p>
              <p>{userData.deliveryAddress}</p>
            </div>

            <div className={style.payment} onChange={handlePaymentCHange}>
              <h2>Payment options</h2>

              <div className={style["payment-item"]}>
                <input
                  type="radio"
                  name="payment"
                  id="cash"
                  value="cash"
                  defaultChecked
                />
                <label htmlFor="cash">Cash</label>
              </div>

              <div className={style["payment-item"]}>
                <input
                  type="radio"
                  name="payment"
                  id="creditCard"
                  value="creditCard"
                />
                <label htmlFor="creditCard">Credit Card</label>
              </div>

              <div className={style["payment-item"]}>
                <input
                  type="radio"
                  name="payment"
                  id="bitcoin"
                  value="bitcoin"
                />
                <label htmlFor="bitcoin">Bitcoin</label>
              </div>
            </div>
          </div>
          <div className={style["order-info"]}>
            <h2>Order</h2>

            {orderedItems.map((item) => {
              return (
                <div className={style["order-info-item"]} key={item.id}>
                  <img alt="Ordered Item" src={item.imgUrl}></img>

                  <div className={style["order-item-info"]}>
                    <h3>{item.name}</h3>
                    <span className={style["item-price"]}>
                      {"$" + item.price}
                    </span>
                    <span className={style["item-amount"]}>
                      {"x " + item.amount}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className={style["order-total"]}>
              <span>Total</span>
              <span>{"$" + cartCtx.cart.priceTotal}</span>
            </div>
          </div>
        </div>
        <Button
          type="button"
          look="primary"
          disabled={orderedItems.length <= 0}
          onClick={handleOrder}
        >
          Place order
        </Button>
      </Card>
    </Page>
  );
}
