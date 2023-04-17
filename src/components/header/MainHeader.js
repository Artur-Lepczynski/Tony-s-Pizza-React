import style from "./MainHeader.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import Button from "../UI/Button";

export default function MainHeader(props) {

  const navigate = useNavigate();

  function handleTrackOrder(){
    navigate("/order");
  }

  return (
    <header className={style.header}>
      <div className={style["logo-wrapper"]}>
        <img src={logo} alt="Pizza logo" />
        <Link className={style["link-home"]} to="/">
          <h1 className={style["header-name"]}>Tony's Pizza</h1>
        </Link>
        {props.data.ordered && (
          <Button className={style["order-button"]} type="button" look="primary" onClick={handleTrackOrder}>Track Order</Button>
        )}
      </div>
      {props.data.token && (
        <>
          <nav>
            <p>Hello, {props.data.name || "User"}</p>
            <Button className={style.account} type="link" to="account" look="primary">
              <i className="fa-solid fa-user"></i>
            </Button>
          </nav>
        </>
      )}
      {!props.data.token && (
        <nav>
          <Button
            className={style.link}
            type="link"
            to="auth?mode=login"
            look="primary"
          >
            Log In
          </Button>
          <Button
            className={style.link}
            type="link"
            to="auth?mode=signup"
            look="secondary"
          >
            Sign Up
          </Button>
        </nav>
      )}
    </header>
  );
}
