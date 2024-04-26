import { ChakraProvider } from '@chakra-ui/react'
import { BagProvider } from '@/contexts/BagContext';
import './styles.css'
import "@fontsource/poppins";

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
    },
})

type iProps = {
    Component: any,
    pageProps: any
}

function MyApp({ Component, pageProps }: iProps) {
    return (
        <BagProvider>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </BagProvider>
    )
}

export default MyApp

