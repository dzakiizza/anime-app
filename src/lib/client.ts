import { ApolloClient, InMemoryCache } from "@apollo/client";


const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || "https://graphql.anilist.co";

export const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});
