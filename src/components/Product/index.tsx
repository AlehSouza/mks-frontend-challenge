'use client'

import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    Icon,
    chakra,
    Tooltip,
} from '@chakra-ui/react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { FiShoppingCart } from 'react-icons/fi'

interface RatingProps {
    rating: number
    numReviews: number
}

function Rating({ rating, numReviews }: RatingProps) {
    return (
        <Box display="flex" alignItems="center">
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                key={i}
                                style={{ marginLeft: '1' }}
                                color={i < rating ? 'teal.500' : 'gray.300'}
                            />
                        )
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{ marginLeft: '1' }} />
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} />
                })}
            <Box as="span" ml="2" color="gray.600" fontSize="sm" paddingLeft={1}>
                {numReviews} review{numReviews > 1 && 's'}
            </Box>
        </Box>
    )
}

type IProps = {
    product: any,
}

const Index = ({ product }: IProps) => {
    return (
        <Box
            maxW="sm"
            rounded="lg"
            shadow="md"
            width={'100%'}
            color={'black'}
            position="relative"
            pt={6}
        >
            {product.name && (
                <Circle size="10px" position="absolute" top={2} right={2} bg="green.200" />
            )}

            <Image src={product.photo} width={200} height={200} alt={`Picture of ${product.name}`} roundedTop="lg" style={{ margin: '0 auto' }} />

            <Box p="6">
                <Box display="flex" alignItems="baseline">
                    {product.name && (
                        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                            New
                        </Badge>
                    )}
                </Box>
                <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <Box
                        fontSize="xl"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated>
                        {product.name}
                    </Box>
                    <Tooltip
                        label="Add to cart"
                        bg="white"
                        placement={'top'}
                        fontSize={'1.1em'}>
                        <chakra.a href={'#'} display={'flex'}>
                            <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                        </chakra.a>
                    </Tooltip>
                </Flex>

                <Flex justifyContent="space-between" alignContent="center">
                    <Rating rating={(product.id % 2) == 0 ? 4 : 5} numReviews={product.id} />
                    <Box fontSize="xl">
                        <Box as="span" fontSize="lg" pr={2}>
                            R$
                        </Box>
                        {product.price}
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Index 