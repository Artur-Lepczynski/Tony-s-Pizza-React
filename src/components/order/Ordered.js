import Card from "../UI/Card";
import Page from "../UI/Page";

import style from "./Ordered.module.css";

import { useContext, useEffect } from "react";
import { cartContext } from "../../store/CartContext";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import Button from "../UI/Button";
import { useCountdown } from "../../hooks/useCountdown";

export default function Ordered() {
  const cartCtx = useContext(cartContext);

  const submit = useSubmit();

  useEffect(() => {
    localStorage.cart = JSON.stringify(cartCtx.cart);
  }, []);

  let deliveryTime = 0;

  if (localStorage.cart) {
    const cart = JSON.parse(localStorage.cart);
    deliveryTime = cart.deliveryTime;
    //clear context?
  } else {
    deliveryTime = cartCtx.cart.deliveryTime;
  }

  const { minutes, seconds } = useCountdown(deliveryTime);

  let content;
  if (minutes + seconds > 0) {
    content = (
      <div className={style["delivery"]}>
        <p>Your order will be delivered in:</p>
        <div className={style.time}>
          <p>
            {`${minutes < 10 ? "0" : ""}` + minutes}:
            {`${seconds < 10 ? "0" : ""}` + seconds}
          </p>
        </div>
        <p>Please hang tight!</p>
      </div>
    );
  } else {
    content = (
      <div className={style["delivered"]}>
        <p>Your order has been delivered!</p>
      </div>
    );
  }

  function handleReset() {
    cartCtx.dispatchCart({ type: "RESET" });
    submit(null, {method: "post"});
  }

  return (
    <Page>
      <Card className={style["main-wrapper"]}>
        <h2>Thanks for you order!</h2>
        {content}
        <hr />
        <Button type="button" look="primary" onClick={handleReset}>Reset Order</Button>
      </Card>
    </Page>
  );
}
