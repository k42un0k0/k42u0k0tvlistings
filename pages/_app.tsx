import "../styles/globals.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Head from "next/head";

const theme = createMuiTheme({});

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <>
      <Head>
        <title>K42un0k0 TV Listings</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
