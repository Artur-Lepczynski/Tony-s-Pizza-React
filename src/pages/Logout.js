import { redirect } from "react-router-dom";

export function action(){
  // localStorage.clear(); 
  delete localStorage.name;
  delete localStorage.email;
  delete localStorage.lastName; 
  delete localStorage.address;
  delete localStorage.password; 
  delete localStorage.token; 
  return redirect("/");
}