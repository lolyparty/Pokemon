import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
    const res = await data.json();

    const pokemonDetails = res.results.map(async (pokemon) => {
        const details = await fetch(pokemon.url);
        const pokemonData = await details.json()
        return pokemonData
    })

    const results = await Promise.all(pokemonDetails)
  
    // Get the paths we want to pre-render based on posts
    const paths = results.map((post) => ({
      params: { id: `${post.id}`},
    }))
    return { paths, fallback: false }
  }

export const getStaticProps = async ({params}) => {
    const id = params.id
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const res = await data.json();


    return {
        props:{
            onePokemon: res
        }
    }
}

const EachPokemon = ({onePokemon})=>{

    return <>
        <Head>
            <title>{onePokemon.name}</title>

        </Head>
        <Box display='flex' justifyContent='center' alignitems='center' minW='fill' minH='fill' color='#000'>
            <Text>{`Hello this is ${onePokemon.name}`}</Text>  
        </Box>
    </>
}

export default EachPokemon;