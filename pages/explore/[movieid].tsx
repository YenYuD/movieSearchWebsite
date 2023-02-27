import React, { use } from "react";
import { useRouter } from "next/router";
import { MovieSearchService } from "../../services/movieServices";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { GetStaticProps } from "next";

const MovieDetailPage = (props: any) => {

    const movieID = props.movieID;
    const backgroundImageURL = 'https://image.tmdb.org/t/p/original';
    const posterURL = 'https://image.tmdb.org/t/p/w500';

    const qkMovieData = [MovieSearchService.GetMovieDataByID.fnName, movieID];

    const getMovieDataFn = async () => {
        const data = await MovieSearchService.GetMovieDataByID(movieID!);
        return data;
    }

    const { data: movieDetailData } = useQuery(qkMovieData, getMovieDataFn, { enabled: !!movieID });

    if (!movieDetailData) return <div>no data!</div>


    const timeConvert = (n: number) => {
        const min = n % 60;
        const hour = (n - min) / 60;
        if (hour === 0) {
            return `${min}min`
        } else {
            return `${hour}h ${min}min`
        }
    }

    return <>
        {movieID ?
            <Grid className="h-auto">
                <Grid className="relative pt-32">
                    <Image className="object-cover -z-10 brightness-50" src={`${backgroundImageURL}${movieDetailData.poster_path}`} alt="poster" fill />
                    <Grid className="h-screen z-10 w-3/4 m-auto bg-black/50 rounded-3xl  gap-8 p-9">
                        <Grid className="flex">
                            <Grid className="basis-1/3 shrink-0">
                                <Image className="m-auto" src={`${posterURL}${movieDetailData.poster_path}`} alt="poster" width={300} height={500} />
                            </Grid>
                            <Grid className="grow-0">
                                <Grid className="py-8">
                                    <Typography variant="h4" align="center" className="pt-8 pb-4" >{movieDetailData.original_title}({movieDetailData.release_date.split('-')[0]})</Typography>
                                    <div className="flex flex-col items-center">
                                        <Grid>
                                            {movieDetailData.genres.map((v: any) => {
                                                return <Chip className="mx-2" color="primary" variant="outlined" size="small" key={v.id} label={v.name} />
                                            })}
                                        </Grid>
                                        <Grid>
                                            <Typography className="py-4">{timeConvert(movieDetailData.runtime)}</Typography>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid>
                                    <Typography className="opacity-60 pb-6">{movieDetailData.tagline}</Typography>
                                    <Typography variant="h6">Overview</Typography>
                                    <Typography className="py-2" >{movieDetailData.overview}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            : <div>movie not find!</div>}

    </>
}

export async function getStaticPaths() {


    const { genres: allGenres } = await MovieSearchService.GetAllGernes();

    const paths: { params: { movieid: string } }[] = [];

    await Promise.all(allGenres.map(async (item: any) => {
        const { results } = await MovieSearchService.FilterMovieByGenre(item.id);

        for (let i of results) {
            paths.push({ params: { movieid: i.id.toString() } })
        }

    }));



    return {
        paths: paths,
        fallback: true
    }

}

export async function getStaticProps(context: any) {
    const { params } = context;

    const movieID = params.movieid;

    const queryClient = new QueryClient();

    const qkMovieData = [MovieSearchService.GetMovieDataByID.fnName, movieID];

    await queryClient.prefetchQuery(qkMovieData, async () => {
        const data = await MovieSearchService.GetMovieDataByID(movieID!);
        return data;
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            movieID
        },
        revalidate: 60
    }

}



export default MovieDetailPage