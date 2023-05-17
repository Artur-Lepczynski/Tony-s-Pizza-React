import Card from "../UI/Card";
import Page from "../UI/Page";

import style from "./Ordered.module.css";

import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../store/CartContext";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import Button from "../UI/Button";
import { useCountdown } from "../../hooks/useCountdown";

export default function Ordered() {
  const cartCtx = useContext(cartContext);

  const [delivered, setDelivered] = useState(false);

  const submit = useSubmit();

  useEffect(() => {
    localStorage.cart = JSON.stringify(cartCtx.cart);
  }, []);

  let deliveryTime = cartCtx.cart.deliveryTime;

  // if (localStorage.cart) {
  //   const cart = JSON.parse(localStorage.cart);
  //   deliveryTime = cart.deliveryTime;
  //   //clear context?
  // } else {
  //   deliveryTime = cartCtx.cart.deliveryTime;
  // }

  console.log(cartCtx.cart.deliveryTime)
  console.log(deliveryTime);

  // const { minutes, seconds } = useCountdown(deliveryTime);

  function handleReset() {
    cartCtx.dispatchCart({ type: "RESET" });
    submit(null, { method: "post" });
  }

  return (
    <Page>
      <Card className={style["main-wrapper"]}>
        <h2>Thanks for your order!</h2>
        {!delivered && (
          <div className={style.delivery}>
            <p>Your order will be delivered in:</p>
            <div className={style.time}>
              <p>
                {new Date(+deliveryTime).toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
        <hr />
        <Button type="button" look="primary" onClick={handleReset}>
          Reset Order
        </Button>
      </Card>
    </Page>
  );
}
