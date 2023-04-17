import { useLoaderData, redirect } from "react-router-dom";
import { checkAuth } from "../util/auth";
import AccountInformation from "../components/account/AccountInformation";

export default function Account() {
  const data = useLoaderData();
  console.log("account data:", data);

  return <AccountInformation userData={data} />
}

export function accountLoader() {
  //loader sprawdza dane konta z backendu, lecz backendu nie ma
  //więc dane są pobierane z localStorage

  if(!checkAuth()) return redirect("/auth?mode=login"); //sprawdza czy użytkownik jest zalogowany

  const data = {
    name: localStorage.name || "User",
    lastName: localStorage.lastName || "Last Name",
    email: localStorage.email,
    address: localStorage.address || "Address",
    password: localStorage.password,
  };

  return data;
}
