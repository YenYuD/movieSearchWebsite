import React, { useEffect, useState } from "react";
import { MovieSearchService } from "../../services/movieServices";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import SuscribeInput from "../../components/UI/SuscribeInput";
import RateMovies from "../../components/UI/RateMovies";
import Comment from "../../components/UI/Comments";
import { getComments } from "../../libs/loadComments";
import axios from "axios";

const MovieDetailPage = (props: any) => {

    const { initialComments } = props;

    const { dehydratedState: { queries: queryData } } = props;

    const movieDetailData = queryData[0].state.data;

    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [comments, setComments] = useState(initialComments);

    const movieID = props.movieID;

    const updateComment = async () => {
        const res = await axios.get('/api/comments/' + movieID);
        return res.data.comments;
    }

    const { data: newComments } = useQuery(['movieID', movieID], updateComment, { enabled: !!movieID });

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
            <Grid className="relative pt-32 h-auto pb-40">
                <Image className="object-cover -z-10 brightness-50" src={`${backgroundImageURL}${movieDetailData.poster_path}`} alt="poster" fill priority={true} />
                <Grid className="backdrop z-10 w-3/4 m-auto bg-black/50 rounded-3xl flex flex-col  gap-16 p-9">
                    <Grid className="flex">
                        <Grid className="basis-1/3 shrink-0">
                            <Image className="m-auto" src={`${posterURL}${movieDetailData.poster_path}`} alt="poster" width={300} height={500} priority={true} style={{ width: 'auto' }} />
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
                    <Divider className="w-full before:border-t-stone-50 after:border-t-stone-50">
                        COMMENTS ABOUT THE MOVIE
                    </Divider>
                    <Grid className="flex flex-col gap-3 justify-between max-h-[40vh] overflow-y-auto">
                        {comments.map((v: any) => {
                            return <Comment key={v._id} id={v.username} rateValue={v.rateValue} comment={v.comment} />
                        })}
                    </Grid>
                    <Grid className="flex items-stretch gap-6 justify-between flex-wrap lg:flex-nowrap ">
                        <RateMovies movieID={movieID} />
                        <SuscribeInput showAlert={showAlert} setShowAlert={setShowAlert} showSuccess={showSuccess} setShowSuccess={setShowSuccess} />
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    </>
}

export async function getStaticPaths() {

    const { genres: allGenres } = await MovieSearchService.GetAllGernes();


    const paths: { params: { movieid: string } }[] = [];

    await Promise.all(allGenres.map(async (item: any) => {
        const { results } = await MovieSearchService.FilterMovieByGenre(1, item.id);

        for (let i of results) {
            paths.push({ params: { movieid: i.id.toString() } })
        }

    }));

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

    await queryClient.prefetchQuery(qkMovieData, async () => {
        const data = await MovieSearchService.GetMovieDataByID(movieID!);
        return data;
    });

    if (!movieID) return { notFound: true }


    const { comments } = await getComments(movieID);


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