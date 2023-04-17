import { redirect, useNavigate } from "react-router-dom";
import Checkout from "../components/checkout/Checkout";

import { menu } from "../store/products";

import { useEffect } from "react";


export default function CheckoutPage() {


  const navigate = useNavigate(); 

  useEffect(()=>{
    if(localStorage.ordered === "true"){
      navigate("/order"); 
    }
  }, [])

  return (
    <Checkout/>
  );
}


export function loader() {
  //Sciąganie danych z backendu na temat menu i użytkownika
  //zastąpione zczytywaniem z zaimportowanego obiektu poglądowego
  //i localstorage

  const data = {
    name: localStorage.name || "User",
    lastName: localStorage.lastName || "Last Name",
    email: localStorage.email,
    address: localStorage.address || "Address",
    deliveryAddress: localStorage.deliveryAddress || "Delivery Address",
    password: localStorage.password,
  };

  return {menu, userData: data};
}

export function action(){
  return redirect("/order");
}

