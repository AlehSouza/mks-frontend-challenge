// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import './styles.css'
import "@fontsource/poppins";

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
    },
})

// 3. Pass the `theme` prop to the `ChakraProvider`
type iProps = {
    Component: any,
    pageProps: any
}

function MyApp({ Component, pageProps }: iProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp