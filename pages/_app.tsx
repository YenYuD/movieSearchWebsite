import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/movieWebSites/homePage/Footer";
import "@fontsource/antic-didone";
import Layout from "../components/Layouts/Layout";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Head from "next/head";
import { ThemeOptions } from "@mui/material";
import { NotificationContextProvider } from "../store/notification-context";
import React from 'react'
import { appWithTranslation } from 'next-i18next'


const App = ({ Component, pageProps }: AppProps) => {
  const theme: ThemeOptions = createTheme({
    typography: {
      fontFamily: ["Antic Didone", "serif"].join(","),
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#ffab40',
      },
      warning: {
        main: '#ff6d00',
      },
      divider: 'rgba(255,235,238,0.6)',
      info: {
        main: '#81d4fa',
      },
    },

  });

  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <NotificationContextProvider>
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
      </NotificationContextProvider>
    </>
  );
}

export default appWithTranslation(App);