import React, { use } from "react";
import { useRouter } from "next/router";
import { MovieSearchService } from "../../services/movieServices";
import { useQuery } from "react-query";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";


const MovieDetailPage = () => {

    const router = useRouter();
    const movieID = router.query.movieid?.toString();
    const backgroundImageURL = 'https://image.tmdb.org/t/p/original';
    const posterURL = 'https://image.tmdb.org/t/p/w500';

    const qkMovieData = [MovieSearchService.GetMovieDataByID.fnName, movieID];
    const qryMovieData = useQuery({
        queryKey: qkMovieData,
        queryFn: async () => {
            const data = await MovieSearchService.GetMovieDataByID(movieID!);
            return data;
        },
        enabled: !!movieID
    });

    const movieDetailData = qryMovieData.data;

    const timeConvert = (n: number) => {
        const min = n % 60;
        const hour = (n - min) / 60;
        if (hour === 0) {
            return `${min}min`
        } else {
            return `${hour}h ${min}min`
        }
    }

    console.log(movieDetailData);

    return <>
        {movieID ? <>
            {movieDetailData && <Grid className="h-auto">
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
            </Grid>}
        </> : <div>movie not find!</div>}

    </>
}

export default MovieDetailPage