import { useQuery } from "react-query";
import { MovieSearchService } from "../../services/movieServices";
import Image from "next/image";
import {
    Autocomplete,
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import Link from "next/link";
import SelectGenre from "../../components/UI/SelectGenre";
import { useForm, Controller } from "react-hook-form";
import { useMemo, useState } from "react";

const Explore = () => {

    const qkMovieData = [MovieSearchService.GetPopularMovies.fnName];
    const qryMovieData = useQuery({
        queryKey: qkMovieData,
        queryFn: async () => {
            const data = await MovieSearchService.GetPopularMovies();
            return data;
        },
    });

    const qkMovieGernes = [MovieSearchService.GetAllGernes.fnName];
    const qryAllGernes = useQuery({
        queryKey: qkMovieGernes,
        queryFn: async () => {
            const data = await MovieSearchService.GetAllGernes();
            return data;
        },
    });

    const movieData = qryMovieData.data && qryMovieData.data.results;
    const imageURL = "https://image.tmdb.org/t/p/w500";



    const handleOnChange = () => {

    }

    return (
        <>
            <Grid className="pt-40 flex px-6">
                <SelectGenre
                    fullWidth
                    options={qryAllGernes.data && qryAllGernes.data.genres}
                    getOptionLabel={(opt: any) => opt.name}
                    sx={{ width: 300 }}
                    label='select genre'
                />
            </Grid>
            <Grid className="pt-40 flex flex-wrap h-auto justify-center">
                {movieData &&
                    movieData.map((v: any) => {
                        return (
                            <>
                                <Grid className="relative transition-all overflow-hidden [&>img]:hover:brightness-50 [&>div]:hover:top-1/2 ">
                                    <Image
                                        alt="poster"
                                        src={`${imageURL}${v.poster_path}`}
                                        width={500}
                                        height={500}
                                    />
                                    <div className="absolute text-center w-full -bottom-28">
                                        <Typography>{v.title}</Typography>
                                        <Button
                                            className="mt-10 tracking-widest font-bold"
                                            color="primary"
                                            variant="outlined"
                                        >
                                            <Link href={`/explore/${v.id}`}>
                                                view Detail
                                            </Link>
                                        </Button>
                                    </div>
                                </Grid>
                            </>
                        );
                    })}
            </Grid>
        </>
    );
};

export default Explore;
