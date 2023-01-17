import { useQuery } from 'react-query';
import { MovieSearchService } from '../../services/movieServices';
import Image from "next/image"
import { Button, Grid, Typography } from '@mui/material';


const Explore = () => {

    const qkMovieData = [MovieSearchService.GetPopularMovies.fnName];
    const qryMovieData = useQuery({
        queryKey: qkMovieData,
        queryFn: async () => {
            const data = await MovieSearchService.GetPopularMovies();
            return data;
        }
    });

    const movieData = qryMovieData.data && qryMovieData.data.results;
    const imageURL = 'https://image.tmdb.org/t/p/w500'

    return (
        <>
            <Grid className="pt-40 flex flex-wrap h-auto justify-center">
                {movieData &&
                    movieData.map((v: any) => {
                        return <>
                            <Grid className="relative transition-all overflow-hidden [&>img]:hover:brightness-50 [&>div]:hover:top-1/2 ">
                                <Image alt="poster" src={`${imageURL}${v.poster_path}`} width={500} height={500} />
                                <div className="absolute text-center w-full -bottom-14"><Typography>{v.title}</Typography>
                                    <Button className='mt-10 tracking-widest font-bold' color="primary" variant='outlined'> view Detail</Button>
                                </div>
                            </Grid>
                        </>
                    })
                }
            </Grid>
        </>
    )
}

export default Explore