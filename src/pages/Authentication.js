import style from "./Authentication.module.css";

import AuthForm from "../components/auth/AuthForm";

import { json, redirect } from "react-router-dom";

import { checkAuth } from "../util/auth";

export default function Authentication() {
  return <AuthForm />;
}


export async function action({request}){
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  const data = await request.formData();

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "unsupported mode!" }, { status: 422 });
  }

  
  let authData; 
  if(mode === "login"){
    authData = {
      email: data.get("email"),
      password: data.get("password"),
    }

    //poglądowe zapisanie informacji do local storage
    localStorage.email = authData.email;
    localStorage.password = authData.password;

  }else{
    authData = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      lastName: data.get("lastName"),
      adress: data.get("address"),
    }

    //poglądowe zapisanie informacji do local storage
    localStorage.email = authData.email;
    localStorage.password = authData.password;
    localStorage.name = authData.name;
    localStorage.lastName = authData.lastName;
    localStorage.address = authData.adress;
  }

  //wysylanie danych do backendu
  // const response = await fetch("http://localhost:8080/" + mode, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(authData)
  // });

  //backend zwraca informacje na temat poprawności danych w przypadku 
  //logowania (błędne hasło)
  // if(response.status === 422 || response.status === 401){
  //   return response; 
  // }else if(!response.ok){
  //   throw json({message: "Could not authenticate user"}, {status: 500})
  // }

  //backend zwraca token (dobre hasło)
  // const resData = await response.json(); 
  // const token = resData.token; 

  //tworzymy token poglądawy 
  localStorage.token = "token" + Math.random(); 

  console.log("in localStorage: ", localStorage);
  console.log("sending auth data: ", authData);
  return redirect("/");
}

export function loader(){
  const loggedIn = checkAuth();
  if(loggedIn){
    return redirect("/account");
  }
  return null; 
}

