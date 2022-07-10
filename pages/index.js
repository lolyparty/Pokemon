import Head from 'next/head';
import Image from 'next/image';
import { Box, Text, Flex, Link } from '@chakra-ui/react'
import styles from '../styles/Home.module.css';

export const getStaticProps = async (context) => {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const res = await data.json();

  const pokemonDetails = res.results.map(async (pokemon) => {
    const details = await fetch(pokemon.url);
    const pokemonData = await details.json()
    return pokemonData
  })

  const results = await Promise.all(pokemonDetails)

  return {
    props:{
      pokemonDetails: results
    }
  }
}

export const myLoader = ({src})=>{
  return src
}

export default function Home({pokemonDetails}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="A simple Pokemon website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {console.log(pokemonDetails[0])} 
      <Box>
        <Text fontSize='4xl' color='white' fontWeight='900'>Pokemon</Text>
        <Box display='flex' justifyContent='space-evenly' flexWrap='wrap' gap='10px' py={10} >
          {pokemonDetails.map((pokemon, index) => 
            <Link href={`/${pokemon.id}`} boxShadow='sm' key={index} background='white' borderRadius='lg' minW='2xs' overflow='hidden' my={4} cursor='pointer' _hover={{transform:"scale(1.03)"}} transition="all ease 1s">  
              <Box position='relative' width='fill' height='200px' bg='gray.200'>
                <Image loader={myLoader} src={`${pokemon.sprites.front_default}`} alt={`${pokemon.name.substring(0,1).toUpperCase()} ${pokemon.name.substring(1)} Image`} layout='fill' unoptimized />  
              </Box>
              <Box p={5}>
                <Text color='black' fontWeight='500'>{`#${pokemon.id}`}</Text> 
                <Text color='black' fontWeight='700'>{`${pokemon.name.substring(0,1).toUpperCase()}${pokemon.name.substring(1)}`}</Text> 
              </Box>
            </Link>)
          }
        </Box>
      </Box>
      
    </div>
  )
}
