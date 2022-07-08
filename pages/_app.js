import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css'
import colors from '../utils/theme'
import { extendTheme } from '@chakra-ui/react'


const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
            <Component {...pageProps} />
         </ChakraProvider>
}

export default MyApp
