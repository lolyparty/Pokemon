import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css'
import colors from '../utils/theme'
import { extendTheme } from '@chakra-ui/react'
import Layout from './_layout';


const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
            <Layout >
              <Component {...pageProps} />
            </Layout>
         </ChakraProvider>
}

export default MyApp
