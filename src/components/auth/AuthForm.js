import { useSearchParams, Form, Link } from "react-router-dom";

import useInput from "../../hooks/useInput";

import style from "./AuthForm.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Page from "../UI/Page";

export default function AuthForm(props) {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  let form;
  let formIsValid = false;

  //both:
  //email

  function validateEmail(enteredEmail) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(enteredEmail);
    }

  const {
    enteredValue: enteredEmail,
    enteredValueisValid: enteredEmailIsValid,
    inputIsValid: emailInputIsValid,
    inputBlurHandler: emailInputBlurHandler,
    inputChangeHandler: emailInputChangeHandler,
    reset: emailReset,
  } = useInput(validateEmail);

  //password
  const {
    enteredValue: enteredPassword,
    enteredValueisValid: enteredPasswordIsValid,
    inputIsValid: passwordInputIsValid,
    inputBlurHandler: passwordInputBlurHandler,
    inputChangeHandler: passwordInputChangeHandler,
    reset: passwordReset,
  } = useInput((enteredValue) => enteredValue.trim().length > 6);

  //signup:
  //name
  const {
    enteredValue: enteredName,
    enteredValueisValid: enteredNameIsValid,
    inputIsValid: nameInputIsValid,
    inputBlurHandler: nameInputBlurHandler,
    inputChangeHandler: nameInputChangeHandler,
    reset: nameReset,
  } = useInput((enteredValue) => enteredValue.trim().length > 2);

  //last name
  const {
    enteredValue: enteredLastName,
    enteredValueisValid: enteredLastNameIsValid,
    inputIsValid: lastNameInputIsValid,
    inputBlurHandler: lastNameInputBlurHandler,
    inputChangeHandler: lastNameInputChangeHandler,
    reset: lastNameReset,
  } = useInput((enteredValue) => enteredValue.trim().length > 4);

  //adress
  const {
    enteredValue: enteredAddress,
    enteredValueisValid: enteredAddressIsValid,
    inputIsValid: addressInputIsValid,
    inputBlurHandler: addressInputBlurHandler,
    inputChangeHandler: adressInputChangeHandler,
    reset: addressReset,
  } = useInput((enteredValue) => enteredValue.trim().length > 6);

  if (isLogin) {
    formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

    form = (
      <Page>
      <Card className={style["form-wrapper"]}>
        <h2>Log in</h2>
        <Form className={style.form} method="post">
          <div
            className={`${
              emailInputIsValid
                ? style["form-control"]
                : `${style["form-control"]} ${style.invalid}`
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              required
            />
            {!emailInputIsValid && (
              <p className={style["text-invalid"]}>
                Email is not valid
              </p>
            )}
          </div>

          <div
            className={`${
              passwordInputIsValid
                ? style["form-control"]
                : `${style["form-control"]} ${style.invalid}`
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={enteredPassword}
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
              required
            />
            {!passwordInputIsValid && (
              <p className={style["text-invalid"]}>
                Password should be at least 7 characters long
              </p>
            )}
          </div>
          <div className={style.controls}>
            <Link to={"?mode=signup"}>Don't have an account? Sign up</Link>
            <Button disabled={!formIsValid} type="button" look="primary">Log in</Button>
          </div>
        </Form>
      </Card>
      </Page>
    );
  } else {
    formIsValid =
      enteredEmailIsValid &&
      enteredPasswordIsValid &&
      enteredNameIsValid &&
      enteredLastNameIsValid &&
      enteredAddressIsValid;

    form = (
      <Page>
      <Card className={style["form-wrapper"]}>
        <h2>Sign up</h2>
        <Form className={style.form} method="post">
          <div
            className={`${
              nameInputIsValid
                ? style["form-control"]
                : `${style["form-control"]} ${style.invalid}`
            }`}
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={enteredName}
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              required
            />
            {!nameInputIsValid && (
              <p className={style["text-invalid"]}>
                Name should be at least 3 characters long
              </p>
            )}
          </div>

          <div
            className={`${
              lastNameInputIsValid
                ? style["form-control"]
                : `${style["form-control"]} ${style.invalid}`
            }`}
          >
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              value={enteredLastName}
              onChange={lastNameInputChangeHandler}
              onBlur={lastNameInputBlurHandler}
              required
            />
            {!lastNameInputIsValid && (
              <p className={style["text-invalid"]}>
                Last name should be at least 5 characters long
              </p>
            )}
          </div>

          <div
            className={`${
              addressInputIsValid
                ? style["form-control"]
                : `${style["form-control"]} ${style.invalid}`
            }`}
          >
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={enteredAddress}
              onChange={adressInputChangeHandler}
              onBlur={addressInputBlurHandler}
              required
            />
            {!addressInputIsValid && (
              <p className={style["text-invalid"]}>
                Address should be at least 7 characters long
              </p>
            )}
          </div>

          <div
            className={`${
              emailInputIsValid
                ? style["form-control"]
                : `${style["form-control"]} ${style.invalid}`
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              required
            />
            {!emailInputIsValid && (
              <p className={style["text-invalid"]}>
                Email is not valid
              </p>
            )}
          </div>

          <div
            className={`${
              passwordInputIsValid
                ? style["form-control"]
                : `${style["form-control"]} ${style.invalid}`
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={enteredPassword}
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
              required
            />
            {!passwordInputIsValid && (
              <p className={style["text-invalid"]}>
                Password should be at least 7 characters long
              </p>
            )}
          </div>

        <div className={style.controls}>
            <Link to={"?mode=login"}>Already have an account? Log in</Link>
            <Button disabled={!formIsValid} type="button" look="primary">Sign up</Button>
        </div>
        </Form>
      </Card>
      </Page>
    );
  }

  return form;
}
