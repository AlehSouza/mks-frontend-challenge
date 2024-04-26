import { Box, Flex, Spinner, Text } from "@chakra-ui/react"
import { Bag, Footer, Menu, Product } from "@/components"
import React, { useCallback, useEffect, useState } from "react"
import { api } from "@/services"
import Head from "next/head"

const Index = () => {
    const [products, setProducts] = useState<any>()
    const [loading, setLoading] = useState(true)

    const getProducts = () => {
        try {
            api.get('/products?page=1&rows=12&sortBy=id&orderBy=DESC').then((resp: any) => {
                setProducts(resp)
            })
            setLoading(false)
        } catch (e) {
            console.error(e)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const Products = useCallback(() => {
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
                    products?.data?.products.map((product: any, index: number) => {
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
            <Bag />
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
            <Box minH={'100vh'}>
                {
                    loading &&
                    <Flex
                        width={'100%'}
                        height={'80vh'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='black'
                            size='xl'
                        />
                    </Flex>
                }
                {
                    !loading &&
                    <Products />
                }
            </Box>
            <Footer />
        </Flex>
    )
}

export default Index