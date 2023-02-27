import { dehydrate, QueryClient, useQuery } from "react-query";
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
import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';

interface movieDataType {
    id: number,
    name: string
}


const Explore = (props: any) => {

    const { dehydratedState: { queries: queryData } } = props;

    const { state: { data: { genres: initalGenre } } } = queryData[0];

    const { state: { data: { results: initalMovieData } } } = queryData[1];

    const [genre, setGenre] = useState(initalGenre);
    const [movieData, setMovieData] = useState(initalMovieData);
    const [loading, setLoading] = useState(false);

    const qkFilterMoviesByGenres = [MovieSearchService.FilterMovieByGenre.fnName, genre];
    const qryFilterMoviesByGenres = useQuery({
        queryKey: qkFilterMoviesByGenres,
        queryFn: async () => {
            setLoading(true);
            const data = await MovieSearchService.FilterMovieByGenre(genre);
            return data;
        },
        onSuccess: data => {
            setMovieData(data.results);
            setTimeout(() => { setLoading(false) }, 2000);
        }
    })

    const imageURL = "https://image.tmdb.org/t/p/w500";

    const handleOnChange = (_: any, value: movieDataType) => {
        setGenre(value.id)
    };


    return (
        <>
            <Grid className="pt-40 flex px-8">
                <SelectGenre
                    name='genre'
                    label='select genre'
                    fullWidth
                    options={genre}
                    getOptionLabel={(opt: any) => opt.name}
                    sx={{ width: 300 }}
                    onChange={handleOnChange}
                />
            </Grid>
            <Grid className="pt-40 flex flex-wrap h-auto justify-center gap-3">
                {movieData &&
                    movieData.map((v: any) => {
                        return (
                            <>
                                <Grid key={v.id} className="relative transition-all overflow-hidden [&>img]:hover:brightness-50 [&>div]:hover:top-1/2 ">
                                    {loading ? <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={500} height={750} /> : <Image
                                        alt="poster"
                                        src={`${imageURL}${v.poster_path}`}
                                        width={500}
                                        height={500}
                                    />}

                                    <div className="absolute text-center w-full -bottom-36">
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

export async function getStaticProps() {
    const queryClient = new QueryClient();

    const initalGenreID = 28

    const qkMovieGernes = [MovieSearchService.GetAllGernes.fnName];

    const qkFilterMoviesByGenres = [MovieSearchService.FilterMovieByGenre.fnName, initalGenreID];

    await queryClient.prefetchQuery(qkMovieGernes, async () => {
        const data = await MovieSearchService.GetAllGernes();
        return data;
    });

    await queryClient.prefetchQuery(qkFilterMoviesByGenres, async () => {
        const data = await MovieSearchService.FilterMovieByGenre(initalGenreID);
        return data;
    },);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60
    }

}

export default Explore;
