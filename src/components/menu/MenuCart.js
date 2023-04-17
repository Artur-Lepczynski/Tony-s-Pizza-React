import style from "./MenuCart.module.css";

import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../store/CartContext";
import ReactDOM from "react-dom";

import MenuCartModal from "./MenuCartModal";
import { useLoaderData } from "react-router-dom";

export default function MenuCart(props) {
  const cartCtx = useContext(cartContext);
  const menu = useLoaderData();

  const [anim, setAnim] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  let classes = anim
    ? `${style["cart-container"]} ${style["animation"]}`
    : `${style["cart-container"]}`;

  useEffect(() => {
    if (cartCtx.cart.numberOrdered > 0) {
      setAnim(true);
    }

    const timer = setTimeout(() => {
      setAnim(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [cartCtx.cart.numberOrdered]);

  useEffect(() => {
    if (modalShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalShown]);

  function handleCartClick() {
    setModalShown(true);
  }

  function handleModlaClose() {
    setModalShown(false);
  }

  return (
    <>
      <button className={classes} onClick={handleCartClick}>
        <i className="fa-solid fa-cart-shopping"></i>
        <div className={style["cart-number"]}>{cartCtx.cart.numberOrdered}</div>
      </button>
      ;
      {modalShown &&
        ReactDOM.createPortal(
          <MenuCartModal menu={menu} onClose={handleModlaClose}/>,
          document.querySelector("#modal-target")
        )}
    </>
  );
}
