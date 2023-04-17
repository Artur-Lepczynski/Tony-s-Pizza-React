import { redirect } from "react-router-dom";
import Ordered from "../components/order/Ordered";

export default function OrderedPage() {
  return <Ordered />;
}

export function loader() {
  const ordered = localStorage.getItem("ordered");
  if (!ordered) {
    return redirect("/");
  }
  return null;
}

export function action() {

  return redirect("/");
}
