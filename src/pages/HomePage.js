import { redirect } from "react-router-dom";
import Home from "../components/home/Home";
import { checkAuth } from "../util/auth";

export default function HomePage() {
  return <Home />;
}

export function loader() {
  //loader sprawdza adres z backendu, lecz backendu nie ma
  //więc dane są pobierane z localStorage

  let data;

  // if (!checkAuth()) {
  //   data = {
  //     address: localStorage.deliveryAddress || "",
  //   };
  // } else {
  //   data = {
  //     address: localStorage.address || "",
  //   };
  // }

  data = {address: localStorage.deliveryAddress || localStorage.address || ""};

  return data;
}

export async function action({ request }) {
  const data = await request.formData();

  // console.log(data.get("address"));

  localStorage.deliveryAddress = data.get("address");
  return redirect("/menu");
}
