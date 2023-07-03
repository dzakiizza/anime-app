import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ overflowX: "hidden", background: "#1A202C" }}>
        <ColorModeScript initialColorMode="dark" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
