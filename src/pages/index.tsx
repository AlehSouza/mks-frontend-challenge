import { Box, Flex, Text } from "@chakra-ui/react"
import { Footer, Menu, Product } from "@/components"
import React, { useCallback, useEffect, useState } from "react"
import { api } from "@/services"
import Head from "next/head"

const Index = () => {
    const [products, setProducts] = useState()

    const getProducts = () => {
        api.get('/products?page=1&rows=12&sortBy=id&orderBy=DESC').then((resp: any) => {
            setProducts(resp)
            console.log(resp)
        })
    }

    useEffect(() => {
        getProducts()
        console.log(products)
    }, [])

    const Products = useCallback(() => {
        console.log('aqui daibo', products)

        return (
            <Flex
                width={'80%'}
                m={'0 auto'}
                py={4}
                pb={12}
                gap={12}
                justifyContent={'center'}
                flexWrap={'wrap'}
            >
                {
                    products?.data?.products.map((product, index) => {
                        return (
                            <Product product={product} key={index} />
                        )
                    })
                }
            </Flex>
        )
    }, [products])

    return (
        <Flex
            gap={8}
            display={'flex'}
            width={'100%'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            flexDirection={'column'}
            bgColor={'white'}
        >
            <Head>
                <title>MKS - Produtos</title>
            </Head>
            <Menu />
            <Box>
                <Text
                    textAlign={'center'}
                    fontWeight={'bold'}
                    fontSize={'3xl'}
                    color={'black'}
                    w={'100%'}
                    pt={4}
                >
                    Produtos
                </Text>
            </Box>
            <Products />
            <Footer />
        </Flex>
    )
}

export default Index