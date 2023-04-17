import { useLoaderData, useNavigate } from "react-router-dom";
import Menu from "../components/menu/Menu";

import { redirect } from "react-router-dom";

import { menu } from "../store/products";
import { useEffect } from "react";

export default function MenuPage() {

  const menu = useLoaderData(); 

  const navigate = useNavigate(); 

  useEffect(()=>{
    if(localStorage.ordered === "true"){
      navigate("/order"); 
    }
  }, [])

  return <Menu menu={menu}/>;
}

export function loader() {
  //Sciąganie danych z backendu na temat menu
  //zastąpione zczytywaniem z zaimportowanego obiektu poglądowego
  return menu;
}

export function action({request}){
  return redirect("/checkout"); 
}
