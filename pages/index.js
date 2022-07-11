import Head from 'next/head';
import { Box} from '@chakra-ui/react';
import PokemonCard from '../components/pokemonCard';

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
    <>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="A simple Pokemon website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {console.log(pokemonDetails[0])} 
      <Box>
        
        <Box display='flex' justifyContent='space-evenly' flexWrap='wrap' gap='10px' py={10} >
          {pokemonDetails.map((pokemon, index) => <PokemonCard key={index} {...pokemon}/>)}
        </Box>
      </Box>
      
    </>
  )
}
