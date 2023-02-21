import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { createUploadLink } from "apollo-upload-client";
import withApollo from "next-with-apollo";
import { endpoint, prodEndpoint } from "../config";
import paginationField from "./paginationField";

const createClient = ({ headers, initialState }: any) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      console.log(
        `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
      );
    }
  });

  const uploadLink = createUploadLink({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    headers,
  });

  const link = ApolloLink.from([errorLink, uploadLink]);

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: paginationField() as any,
        },
      },
    },
  }).restore(initialState || {});

  return new ApolloClient({
    link,
    cache,
  });
};

export default withApollo(createClient, { getDataFromTree });
