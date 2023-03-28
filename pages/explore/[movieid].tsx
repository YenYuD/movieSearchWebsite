import React, { useEffect, useState } from "react";
import { MovieSearchService } from "../../services/movieServices";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import RateMovies from "../../components/UI/RateMovies";
import Comment from "../../components/UI/Comments";
import axios from "axios";
import Cast from "../../components/UI/Cast";

const MovieDetailPage = (props: any) => {

    const { initialComments } = props;

    const movieID = props.movieID;

    const qkMovieData = [MovieSearchService.GetMovieDataByID.fnName, movieID];

    const { data: movieDetailData } = useQuery(qkMovieData, async () => {
        const data = await MovieSearchService.GetMovieDataByID(movieID!);
        return data;
    })

    const qkMovieCast = [MovieSearchService.GetCast.fnName, movieID];

    const { data: castData } = useQuery(qkMovieCast, async () => {
        const data = await MovieSearchService.GetCast(movieID!);
        return data;
    })

    const [comments, setComments] = useState(initialComments);


    const updateComment = async () => {
        const res = await axios.get('/api/comments/' + movieID);
        return res.data.comments;
    }

    const { data: newComments, refetch } = useQuery(['movieID', movieID], updateComment, { enabled: !!movieID });

    useEffect(() => {
        if (newComments) {
            setComments(newComments);
        }
    }, [newComments])


    const backgroundImageURL = process.env.NEXT_PUBLIC_BG_IMAGE_URL;
    const posterURL = process.env.NEXT_PUBLIC_POSTER_URL;

    if (!movieDetailData || !movieID) return <div>movie not Found!</div>


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
        <Head>
            <title>{movieDetailData.original_title}</title>
            <meta name="description" content={`movie overview : ${movieDetailData.overview}`} />
            <meta charSet="UTF-8" />
            <link rel="icon" type="image/png" href="/images/popcorn.png" />
        </Head>
        <Grid>
            <Grid className="relative pt-16 md:pt-32 h-auto  pb-24 sm:pb-40">
                <Image className="object-cover -z-10 brightness-50" src={`${backgroundImageURL}${movieDetailData.poster_path}`} alt="poster" fill priority={true} />
                <Grid className="backdrop z-10 w-[95%] sm:w-3/4 m-auto bg-black/50 rounded-3xl flex flex-col  gap-16 p-6 md:p-9">
                    <Grid className="flex flex-col gap-4">
                        <Grid className=" pb-0  md:py-8 gap-4 flex flex-wrap justify-center lg:flex-nowrap">
                            <Grid className="flex md:basis-1/2 max-w-full w-full justify-center"> <Image className="m-auto" src={`${posterURL}${movieDetailData.poster_path}`} alt="poster" width={300} height={500} priority={true} style={{ width: 'auto' }} /></Grid>
                            <Grid className="flex flex-col md:basis-1/2 2xl:shrink-0">
                                <Typography variant="h4" align="center" className="pt-8 pb-4" >{movieDetailData.original_title}({movieDetailData.release_date.split('-')[0]})</Typography>
                                <div className="flex flex-col items-center">
                                    <Grid className="flex gap-2 flex-wrap justify-center">
                                        {movieDetailData.genres.map((v: any) => {
                                            return <Chip color="primary" variant="outlined" size="small" key={v.id} label={v.name} />
                                        })}
                                    </Grid>
                                    <Grid>
                                        <Typography className="py-4">{timeConvert(movieDetailData.runtime)}</Typography>
                                    </Grid>
                                    <Typography className="self-start my-1">Casts:</Typography>
                                    <Grid className="w-[80vw] phone:w-[350px]  md:w-[530px] 2xl:w-[35vw] overflow-x-auto flex">
                                        <Grid className="flex gap-2 ">
                                            <Cast castData={castData} />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid className="text-left">
                            <Typography className="opacity-60 pb-6">{movieDetailData.tagline}</Typography>
                            <Typography variant="h6" className="text-center">Overview</Typography>
                            <Typography style={{ overflowWrap: 'break-word' }} className="py-2 2xl:px-52  2xl:text-center" >{movieDetailData.overview}</Typography>
                        </Grid>
                    </Grid>
                    <Divider className="w-full max-md:[&>span]:whitespace-normal  before:border-t-stone-50 after:border-t-stone-50">
                        COMMENTS ABOUT THE MOVIE
                    </Divider>
                    <Grid className="flex flex-col gap-3 justify-between max-h-[40vh] overflow-y-auto">
                        {comments.length ? comments.map((v: any) => {
                            return <Comment key={v._id} id={v.username} rateValue={v.rateValue} comment={v.comment} />
                        }) : <Typography component='p' className="text-center">Leave the first comment!</Typography>}
                    </Grid>
                    <Grid className="flex items-stretch gap-6 justify-center md:justify-between flex-wrap 2xl:flex-nowrap ">
                        <RateMovies movieID={movieID} refetch={refetch} />
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    </>
}

export async function getStaticPaths() {

    const { genres: allGenres } = await MovieSearchService.GetAllGernes();

    const paths: { params: { movieid: string } }[] = [];

    for (let j = 0; j < allGenres.length; j++) {
        const item = allGenres[j];
        const { results } = await MovieSearchService.FilterMovieByGenre(1, item.id);

        for (let i = 0; i < results.length; i++) {
            paths.push({ params: { movieid: results[i].id.toString() } })
        }
    }

    return {
        paths: paths,
        fallback: 'blocking'
    }

}

export async function getStaticProps(context: any) {
    const { params } = context;

    const movieID = params.movieid;

    const queryClient = new QueryClient();

    const qkMovieData = [MovieSearchService.GetMovieDataByID.fnName, movieID];

    const qkMovieCase = [MovieSearchService.GetCast.fnName, movieID];

    try {
        await queryClient.prefetchQuery(qkMovieData, async () => {
            const data = await MovieSearchService.GetMovieDataByID(movieID!);
            return data;
        });
        await queryClient.prefetchQuery(qkMovieCase, async () => {
            const data = await MovieSearchService.GetCast(movieID);
            return data;
        })
    } catch (err) {
        console.log(err);
    }

    if (!movieID) return { notFound: true }

    const res = await fetch(process.env.BASE_URL + '/api/comments/' + movieID);
    const { comments } = await res.json();



    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            movieID,
            initialComments: comments ? comments : []
        },
        revalidate: 10
    }

}




export default MovieDetailPage