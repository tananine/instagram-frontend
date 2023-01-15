import store from '/store/index'
import '/styles/globals.css'
import '/styles/tailwind.css'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import axios from 'axios'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  const styles = createTheme({
    breakpoints: {
      values: {
        w0: 0,
        w450: 450,
        w470: 470,
        w875: 875,
        w999: 999,
      },
    },
  })

  axios.defaults.baseURL = 'http://localhost:3001'

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={styles}>
          <div className="min-w-[880px] px-4">
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  )
}

export default MyApp
