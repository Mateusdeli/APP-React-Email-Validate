import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {theme} from 'theme'

const GlobalStyle = createGlobalStyle`
  html, body {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp