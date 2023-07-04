import { Box } from "@chakra-ui/react";
import Header from "./header";
import Head from "next/head";
import Scrollbars from "rc-scrollbars";

type LayoutProps = {
  title?: string;
  keywords?: string;
  description?: string;
};

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  title,
  description,
  keywords,
}) => (
  <Scrollbars autoHide autoHeight autoHeightMin={"100vh"}>
    <Box w="100vw" overflow="hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="feedloop.io" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      {children}
    </Box>
  </Scrollbars>
);

Layout.defaultProps = {
  title: "Anime App",
  description:
    "Anime app is a web app that showing list of anime and maintain a collection of preferred anime",
  keywords: "anime, top anime, anime list, collection of anime",
};

export default Layout;
