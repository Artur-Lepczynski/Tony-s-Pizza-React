import { Link } from "react-router-dom";
import style from "./Button.module.css";

export default function Button(props) {
  if (props.type === "button") {
    return (
      <button
        className={`${style.button} ${
          props.look === "primary" ? style.primary : style.secondary
        } ${props.disabled === true ? style.disabled : ""} ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  } else if (props.type === "link") {
    return (
      <Link
        to={props.to}
        className={`${style.button} ${
          props.look === "primary" ? style.primary : style.secondary
        } ${props.className}`}
      >
        {props.children}
      </Link>
    );
  }
}
