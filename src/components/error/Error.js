import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Page from "../UI/Page";

import style from "./Error.module.css";

export default function Error() {

  const navigate = useNavigate();

function handleBackToSafety() {
  navigate("/");
}

return <Page className={style.page}>
  <Card className={style.card}>
    <h2>404 page not found</h2>
    <p>
      The page you are looking does not exist. Do not worry, we already 
      sent a team of highly trained monkeys to fix the problem.
    </p>
    <Button type="button" look="primary" onClick={handleBackToSafety}>Back to safety</Button>
  </Card>
</Page>
}