import Page from "@/components/Page";
import { Router } from "next/router";
import nProgress from "nprogress";
import "../components/styles/nprogress.css";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

const MyApp = ({ Component, pageProps }) => {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
};

export default MyApp;
