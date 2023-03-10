import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/movieWebSites/homePage/Footer";
import "@fontsource/antic-didone";
import Layout from "../components/Layouts/Layout";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    typography: {
      fontFamily: ["Antic Didone", "serif"].join(","),
    },
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#b3e5fc",
      },
    },
  });

  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Head>
                <title>Movie Search Website</title>
                <meta name="description" content="A website for you to explore the latest movies with all kinds of genre..." />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/images/popcorn.png" />
              </Head>
              <Component {...pageProps} />
              <Footer />
            </Layout>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
