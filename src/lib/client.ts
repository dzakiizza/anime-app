import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client: ApolloClient<any> | null = null;

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || "https://jsonplaceholder.ir/graphql";

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: GRAPHQL_ENDPOINT || "https://jsonplaceholder.ir/graphql",
      }),
      cache: new InMemoryCache(),
    });
  }
  return client;
};
