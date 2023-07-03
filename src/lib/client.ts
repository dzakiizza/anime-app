import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || "https://graphql.anilist.co";

export const graphqlClient = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

