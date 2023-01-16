import React from 'react'
import { getAllEvents } from '../../Dummy_data';
import { useQuery } from 'react-query';
import { MovieSearchService } from '../../services/movieServices';
import Image from "next/image";


const Explore = () => {

    const qkMovieData = [MovieSearchService.GetMovieDataByID.fnName, '550'];
    const qryMovieData = useQuery({
        queryKey: qkMovieData,
        queryFn: async () => {
            const data = await MovieSearchService.GetMovieDataByID('550');
            return data;
        }
    });

    const movieData = qryMovieData.data;

    const imageURL = 'https://image.tmdb.org/t/p/w500'

    return (
        <>
            <div className="h-screen pt-60">
                {movieData &&
                    <>
                        <div>{movieData.title}</div>
                        <div>{movieData.original_title}</div>
                        <Image alt="poster" src={`${imageURL}${movieData.poster_path}`} width={500} height={500} />
                    </>
                }
            </div>
        </>
    )
}

export default Explore