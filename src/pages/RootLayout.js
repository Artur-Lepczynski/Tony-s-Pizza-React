import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import Page from "../components/UI/Page";

export default function RootLayout() {

  const data = useLoaderData();

  return (
    <>
      <MainHeader data={data} />
        <Outlet />
      {/* <Page>
      </Page> */}
    </>
  )
}
