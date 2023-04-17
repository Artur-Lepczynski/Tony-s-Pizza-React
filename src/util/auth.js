import { redirect } from "react-router-dom";


export function getToken() {
  return localStorage.token || null;
}

export function rootLayoutLoader(){
  console.log("rootLayoutLoader");
  return {
    token: getToken(), 
    name: localStorage.name || null,
    ordered: localStorage.ordered || false,
  }
}

export function checkAuth() {
  if (!localStorage.token) return false;
  return true;
}
