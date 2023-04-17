import { useReducer } from "react";
import React from "react";
import { menu } from "./products";

export const cartContext = React.createContext({
  cart: {},
  dispatchCart: (action) => {},
});

function financial(x) {
  return Number.parseFloat(x.toFixed(2));
}

export default function ContextProvider(props) {
  //{amount: 3, id: "p1"}
  const [cart, dispatchCart] = useReducer(cartReducer, {
    ordered: false,
    paymentMethod: "",
    priceTotal: 0,
    numberOrdered: 0,
    items: [],
  });

  function cartReducer(prevState, action) {
    if (action.type === "ORDER") {
      localStorage.ordered = true; 
      return {
        ...prevState,
        ordered: true,
        paymentMethod: action.paymentMethod,
        deliveryTime: new Date().getTime() + 1000 * 60 * 60 * 0.25,
        // deliveryTime: new Date().getTime() + 1000 * 15,
      };
    }else if(action.type === "RESET"){
      delete localStorage.ordered; 
      delete localStorage.cart; 
      return {
        ordered: false,
        paymentMethod: "",
        priceTotal: 0,
        numberOrdered: 0,
        items: [],
      };
    }

    const orderedCategory = menu.find((category) => {
      return category.items.find((item) => {
        return item.id === action.item.id;
      });
    });
    const orderedItem = orderedCategory.items.find((item) => {
      return item.id === action.item.id;
    });

    const itemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (action.type === "ADD") {
      console.log("Adding:", action.item);

      if (itemIndex === -1) {
        return {
          ...prevState,
          items: [
            ...prevState.items,
            { amount: action.item.quantity, id: action.item.id },
          ],
          priceTotal: financial(
            prevState.priceTotal + orderedItem.price * action.item.quantity
          ),
          numberOrdered: prevState.numberOrdered + action.item.quantity,
        };
      } else {
        const prevStateCopy = { ...prevState };
        prevStateCopy.items[itemIndex].amount += action.item.quantity;
        prevStateCopy.priceTotal = financial(
          prevStateCopy.priceTotal + orderedItem.price * action.item.quantity
        );
        prevStateCopy.numberOrdered += action.item.quantity;
        return prevStateCopy;
      }
    } else if (action.type === "REMOVE") {
      console.log("Removing:", action.item);

      if (itemIndex === -1) {
        return prevState;
      } else {
        const prevStateCopy = { ...prevState };
        prevStateCopy.items[itemIndex].amount -= 1;
        prevStateCopy.priceTotal = financial(
          prevStateCopy.priceTotal - orderedItem.price
        );
        prevStateCopy.numberOrdered -= 1;

        if (prevStateCopy.items[itemIndex].amount <= 0) {
          prevStateCopy.items.splice(itemIndex, 1);
        }

        return prevStateCopy;
      }
    }
  }

  return (
    <cartContext.Provider value={{ cart, dispatchCart }}>
      {props.children}
    </cartContext.Provider>
  );
}
