import { Link, Box, Text } from "@chakra-ui/react"
import Image from 'next/image';



export const myLoader = ({src})=>{
    return src
  }

const PokemonCard = ({id, sprites, name})=>{
    return <Link href={`/${id}`} boxShadow='sm' background='white' borderRadius='lg' minW='2xs' overflow='hidden' my={4} cursor='pointer' _hover={{transform:"scale(1.03)"}} transition="all ease 1s">  
        <Box position='relative' width='fill' height='200px' bg='gray.200'>
            <Image loader={myLoader} src={`${sprites.front_default}`} alt={`${name.substring(0,1).toUpperCase()}${name.substring(1)} Image`} layout='fill' unoptimized />  
        </Box>
        <Box p={5}>
            <Text color='black' fontWeight='500'>
                {`#${id}`}
            </Text> 
            <Text color='black' fontWeight='700'>
                {`${name.substring(0,1).toUpperCase()}${name.substring(1)}`}
            </Text> 
        </Box>
    </Link>
}

export default PokemonCard;