import Page from "../UI/Page";
import MenuCategory from "./MenuCategory";
import style from "./Menu.module.css";
import MenuCart from "./MenuCart";

import { useRef } from "react";

export default function Menu(props) {

  const menuRefs = new Map([
    ["pizza", useRef()],
    ["sauces", useRef()],
    ["drinks", useRef()],
    ["salads", useRef()],
    ["desserts", useRef()],
  ]);


  function handleNavClick(event) {
    const category = event.target.dataset.category;
    const offsetTop = menuRefs.get(category).current.offsetParent.offsetTop;

    window.scrollTo({behavior: "smooth", top: offsetTop - 160})
  }

  return (
    <Page className={style.page}>
      <div className={style["menu-header"]}>
        <button onClick={handleNavClick} data-category="pizza">
          Pizza
        </button>
        <button onClick={handleNavClick} data-category="sauces">
          Sauces
        </button>
        <button onClick={handleNavClick} data-category="drinks">
          Drinks
        </button>
        <button onClick={handleNavClick} data-category="salads">
          Salads
        </button>
        <button
          onClick={handleNavClick}
          data-category="desserts"
          style={{ borderRight: "2px solid black" }}
        >
          Desserts
        </button>
      </div>

      <div className={style["menu-categories"]}>
        {props.menu.map((item) => {
          return (
            <MenuCategory
              key={item.category}
              ref={menuRefs.get(item.category)}
              category={item.category}
              description={item.description}
              items={item.items}
            />
          );
        })}
      </div>

      <MenuCart />

    </Page>
  );
}
