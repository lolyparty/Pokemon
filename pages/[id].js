import {useRouter} from 'next/router';
import { Box } from '@chakra-ui/react';

    

// export const getStaticProps = async ({params}) => {
//     const id = params.id
//     const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     const res = await data.json();

//     return {
//         props:{
//             onePokemon: res
//         }
//     }
// }

const EachPokemon = ({onePokemon})=>{
    const router = useRouter();
    const {id} = router.query

    return <Box display='flex' justifyContent='center' alignitems='center' minW='fill' minH='fill' color='#000'>
        {id}
    </Box>
}

export default EachPokemon;