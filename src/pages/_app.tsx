import Layout from "@/components/layout";
import { graphqlClient } from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/lib/theme";
import React from "react";
import { AppProvider } from "@/context/app-provider";

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <ApolloProvider client={graphqlClient}>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
