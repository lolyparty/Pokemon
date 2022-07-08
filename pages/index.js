import Head from 'next/head';
import Image from 'next/image';
import { Box, Text, Flex } from '@chakra-ui/react'
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

export default function Home({pokemonDetails}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="A simple Pokemon website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {console.log(pokemonDetails)}
      <Box >
        <Text fontSize='4xl' color='white' fontWeight='900'>Pokemons</Text>
       <Box display='flex' justifyContent='space-between' flexWrap='wrap' gap='20px' py={10} >
          {pokemonDetails.map((pokemon, index) => 
          <Box p={5} key={index} background='white' borderRadius='lg' minW='3xs' >
            <Text color='black'>{pokemon.name}, {pokemon.base_experience}</Text>
          </Box>)}
       </Box>
      </Box>
      
    </div>
  )
}
