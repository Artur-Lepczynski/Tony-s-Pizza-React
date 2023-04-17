import Button from "./Button";
import style from "./ModalPrompt.module.css";

export default function ModalPrompt(props) {
  return (
    <div className={style.wrapper}>
      <div className={style.modal}>
        <div className={style.content}>
          <h2>{props.header}</h2>
          <p>{props.message}</p>
        </div>
        <div className={style.actions}>
          <Button className={style.button} onClick={props.onCancel} type="button" look="secondary">
            {props.cancelText}
          </Button>
          <Button className={style.button} onClick={props.onConfirm} type="button" look="primary">
            {props.confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
