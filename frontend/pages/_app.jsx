import Page from "@/components/Page";
import { Router } from "next/router";
import nProgress from "nprogress";
import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import withData from "@/lib/withData";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

const MyApp = ({ Component, pageProps, apollo }) => {
  console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
};

export default withData(MyApp);
