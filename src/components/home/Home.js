import { Form, useLoaderData, useSubmit } from "react-router-dom";
import banner from "../../images/banner.jpg";
import Card from "../UI/Card";
import Page from "../UI/Page";
import style from "./Home.module.css";
import Button from "../UI/Button";
import useInput from "../../hooks/useInput";
import { useEffect, useContext } from "react";

import { cartContext } from "../../store/CartContext";

export default function Home() {
  const data = useLoaderData();

  const cartCtx = useContext(cartContext);

  const submit = useSubmit(); 

  const {
    enteredValue: enteredAddress,
    setEnteredValue: setEnteredAddress,
    enteredValueisValid: enteredAddressIsValid,
    inputIsValid: addressInputIsValid,
    inputBlurHandler: addressInputBlurHandler,
    inputChangeHandler: adressInputChangeHandler,
  } = useInput((value) => value.length > 6);

  useEffect(() => {
    console.log(data);
    if (data && data.address) {
      setEnteredAddress(data.address);
    }
  }, [data, setEnteredAddress]);

  function handleOrderPress(){
    if(localStorage.ordered){
      cartCtx.dispatchCart({ type: "RESET" });
    }
    submit({address: enteredAddress}, {method: "post"});
  }

  return (
    <Page className={style.main}>
      <main>
        <img className={style.banner} src={banner} alt="" />
        <Card className={style.order}>
          
            <h2>{localStorage.ordered ? "Start a new order" : "Begin your order"}</h2>
            <input
              type="text"
              name="address"
              placeholder="Enter address..."
              onChange={adressInputChangeHandler}
              onBlur={addressInputBlurHandler}
              value={enteredAddress}
            ></input>
            {!addressInputIsValid && (
              <p className={style["text-invalid"]}>
                Address should be at least 7 characters long
              </p>
            )}
            <Button
              type="button"
              look="primary"
              disabled={!enteredAddressIsValid}
              onClick={handleOrderPress}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </Button>
          
        </Card>
      </main>

      <Card className={style.description}>
        <h2>Why choose us?</h2>
        <div className={style["description-item"]}>
          <i className="fa-solid fa-pizza-slice"></i>
          <div>
            <h3>Best quality</h3>
            <p>
              Satisfy your cravings with Tony's Pizza! Our handmade pizzas are
              crafted with the freshest ingredients and baked to perfection,
              ensuring that every slice is packed with flavor. From classic
              toppings to gourmet combinations, we've got something for
              everyone. Don't settle for ordinary pizza. Experience the
              difference with Tony's.
            </p>
          </div>
        </div>
        <div className={style["description-item"]}>
          <i className="fa-solid fa-truck-fast"></i>
          <div>
            <h3>Fast delivery</h3>
            <p>
              Hungry and in a hurry? No problem! Tony's Pizza has you covered.
              Our lightning-fast delivery service ensures that your hot, fresh
              pizza arrives at your doorstep in no time. Our drivers are
              friendly and efficient, so you can enjoy your pizza without the
              wait. Order now and taste the difference with Tony's Pizza.
            </p>
          </div>
        </div>

        <div className={style["description-item"]}>
        <i className="fa-solid fa-coins"></i>
          <div>
            <h3>Affordable prices</h3>
            <p>
              At Tony's Pizza, we believe that great pizza shouldn't break the
              bank. That's why we offer affordable prices without sacrificing
              quality. Our handmade pizzas are made with the freshest
              ingredients, so you can indulge in the most delicious pizza
              without hurting your wallet. With our great deals and specials,
              there's never been a better time to enjoy Tony's Pizza. Order now
              and taste the value for yourself.
            </p>
          </div>
        </div>
      </Card>
    </Page>
  );
}
