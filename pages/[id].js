import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';



export const myLoader = ({src})=>{
    return src
  }

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
        <Box p={2} color='white'>
            {console.log(onePokemon)}
            <Text textAlign='center' fontSize='30px' fontWeight={900}>{`${onePokemon.name.substring(0,1).toUpperCase()}${onePokemon.name.substring(1)}`}</Text>  
            <Box position='relative' w='80%' height='400px' mx='auto'>
                <Image loader={myLoader} src={`${onePokemon.sprites.front_default}`} alt={`${onePokemon.name.substring(0,1).toUpperCase()} ${onePokemon.name.substring(1)} Image`} layout='fill' unoptimized /> 
            </Box>
            <Box>
                <Text fontWeight={700} fontSize={20}>Abilities</Text> 
                <ul>
                    {onePokemon.abilities.map((ability, index)=>{
                        return <li key={index}>{ability.ability.name}</li>  
                    })}
                </ul>
            </Box>
            <Box my={10}>
                <Text fontWeight={700} fontSize={20}>Moves</Text> 
                <ul>
                    {onePokemon.moves.map((ability, index)=>{
                        return <li key={index}>{ability.move.name}</li>   
                    })}
                </ul>
            </Box>
        </Box>
    </>
}

export default EachPokemon;