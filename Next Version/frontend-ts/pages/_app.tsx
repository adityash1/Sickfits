import Page from "@/components/Page";
import { Router } from "next/router";
import nProgress from "nprogress";
import "@/components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import withData from "@/lib/withData";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

type Props = {
  Component: React.ComponentType;
  pageProps: any;
  apollo: any;
};

const MyApp = ({ Component, pageProps, apollo }: Props) => {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async function ({ Component, ctx }: any) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
