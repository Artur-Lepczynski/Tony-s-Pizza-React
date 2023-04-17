import style from "./Page.module.css";

export default function Page(props) {
  return <div className={`${style.page} ${props.className}`}>{props.children}</div>;
}
