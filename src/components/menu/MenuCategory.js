import Card from "../UI/Card";
import MenuItem from "./MenuItem";

import style from "./MenuCategory.module.css";

import React from "react";

function MenuCategory(props, ref) {
  return (
    <Card className={style["main-wrapper"]}>
      <h2 ref={ref}>{props.category}</h2>
      <p className={style["category-description"]}>{props.description}</p>
      <div className={style["category-items"]}>
        {props.items.map((item) => {
          return (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              url={item.imgUrl}
              price={item.price}
            />
          );
        })}
      </div>
    </Card>
  );
}

export default React.forwardRef(MenuCategory);
