import { useBag } from "@/contexts/BagContext"
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { useCallback } from "react"
import { FaClosedCaptioning, FaTimes, FaTrash } from "react-icons/fa"

const Index = () => {
    const { onCloseOpenBag, bagOpen, bag, removeFromBag, increaseQuantity, decreaseQuantity, totalBag } = useBag()

    const ProductItem = useCallback(({ product }: any) => {
        return (
            <Flex
                padding={4}
                width={'100%'}
                height={'100px'}
                alignItems={'center'}
                justifyContent={'space-between'}
                borderBottom={'1px solid grey'}
            >
                <Image src={product.photo} width={50} height={50} alt={product.name} />
                <Flex>
                    <Text
                        noOfLines={1}
                        width={'100px'}
                        overflow={'hidden'}
                    >
                        {product.name}
                    </Text>
                </Flex>
                <Flex alignItems={'center'}>
                    Qtd: {product.quantity}
                    <Flex flexDir={'column'} pl={4} gap={1}>
                        <Button bgColor={'green.400'} width={15} height={25} onClick={() => { increaseQuantity(product.id) }}>
                            <Text color={'black'}>+</Text>
                        </Button>
                        <Button bgColor={'red.400'} width={15} height={25} onClick={() => { decreaseQuantity(product.id) }} isDisabled={product.quantity === 1 ? true : false}>
                            <Text color={'black'}>-</Text>
                        </Button>
                    </Flex>
                </Flex>
                <Flex>
                    <Button onClick={() => { removeFromBag(product.id) }}>
                        <FaTrash color="#f96464" />
                    </Button>
                </Flex>
            </Flex>
        )
    }, [bag])

    return (
        <Flex
            position={"fixed"}
            width={"100vw"}
            height={"100vh"}
            backgroundColor={"rgba(0,0,0,0.4)"}
            zIndex={1}
            top={0}
            color={'black'}
            display={bagOpen ? "flex" : "none"}
            flexDir={"row"}
        >
            <Box width={'100%'} height={'100%'} onClick={() => { onCloseOpenBag() }}>
                {/* onCloseonly */}
            </Box>
            <Flex
                minWidth={'400px'}
                width={{
                    base: '280px',
                    lg: '400px',
                    md: '400px',
                    sm: '600px'
                }}
                backgroundColor={"white"}
                boxShadow={"lg"}
                justifyContent={'space-between'}
                flexDir={"column"}
            >
                <Text
                    textAlign={"center"}
                    fontWeight={"bold"}
                    fontSize={"3xl"}
                    bgColor={'black'} color={'white'}
                    w={"100%"}
                    py={4}
                >
                    Produtos
                    <Button onClick={() => { onCloseOpenBag() }}>
                        <FaTimes color="red" />
                    </Button>
                </Text>
                <Flex maxHeight={'80%'} width={'100%'} flexDir={'column'} overflow={'auto'}>
                    {
                        bag.length === 0 &&
                        <Flex p={12} textAlign={'center'} flexDir={'column'}>
                            <Text>Parece que você ainda não adicionou nada no carrinho :(</Text>
                            <br />
                            <Button color={'blue'} onClick={() => { onCloseOpenBag() }} cursor={'pointer'}>Continue comprando!</Button>
                        </Flex>
                    }
                    {
                        bag.map((product: any, index: number) => {
                            return (
                                <ProductItem key={index} product={product} />
                            )
                        })
                    }
                </Flex>
                <Flex height={'200px'} bgColor={'black'} color={'white'} justifyContent={'center'} alignItems={'center'}>
                    Total: {totalBag}
                </Flex> 
            </Flex>
        </Flex>
    )
}

export default Index