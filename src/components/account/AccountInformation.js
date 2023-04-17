import style from "./AccountInformation.module.css";

import { useState } from "react";
import { createPortal } from "react-dom";

import Card from "../UI/Card";
import Button from "../UI/Button";
import { Form, useSubmit } from "react-router-dom";
import ModalPrompt from "../UI/ModalPrompt";
import Page from "../UI/Page";

export default function AccountInformation(props) {
  const [modalShown, setModalShown] = useState(false);
  const submit = useSubmit();

  function signoutButtonHandler() {
    setModalShown(true);
  }

  function cancelSignoutHandler() {
    setModalShown(false);
  }

  function confirmSignoutHandler() {
    setModalShown(false);
    submit(null, { action: "/logout", method: "post" });
  }

  return (
    <Page>
      <Card className={style.main}>
        <h2 className={style.header}>Account information</h2>

        <div className={style["info-wrapper"]}>
          <div className={style["info-item"]}>
            <p className={style["info-item-label"]}>Name:</p>
            <p className={style["info-item-value"]}>{props.userData.name}</p>
          </div>

          <div className={style["info-item"]}>
            <p className={style["info-item-label"]}>Last name:</p>
            <p className={style["info-item-value"]}>
              {props.userData.lastName}
            </p>
          </div>

          <div className={style["info-item"]}>
            <p className={style["info-item-label"]}>Email:</p>
            <p className={style["info-item-value"]}>{props.userData.email}</p>
          </div>

          <div className={style["info-item"]}>
            <p className={style["info-item-label"]}>Address:</p>
            <p className={style["info-item-value"]}>{props.userData.address}</p>
          </div>
        </div>
        <Button
          className={style["button-logout"]}
          onClick={signoutButtonHandler}
          type="button"
          look="primary"
        >
          Sign out
        </Button>
        {modalShown &&
          createPortal(
            <ModalPrompt
              header="Signing out"
              message="Are you sure you want to sign out?"
              cancelText="Cancel"
              confirmText="Sign out"
              onCancel={cancelSignoutHandler}
              onConfirm={confirmSignoutHandler}
            />,
            document.querySelector("#modal-target")
          )}
      </Card>
    </Page>
  );
}
