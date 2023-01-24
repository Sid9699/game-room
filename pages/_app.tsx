import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import AuthContextProvider from "../context/AuthContext";
import { AuthGuard } from "../components";
import { SWRConfig } from "swr";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const fetcher = (args: AxiosRequestConfig) =>
  axios(args).then((res) => res.data);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          </ThemeProvider>
        </AuthContextProvider>
      </SWRConfig>
    </CacheProvider>
  );
};

export default MyApp;
