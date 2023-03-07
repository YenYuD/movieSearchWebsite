import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from "react-query";
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
import { Fragment, useState } from "react";
import { getPlaiceholder } from "plaiceholder";

interface movieDataType {
    id: number,
    name: string
}

interface genreType {
    id: number,
    name: string
}


const Explore = (props: any) => {

    const { dehydratedState: { queries: queryData } } = props;

    const { state: { data: { genres: initalGenre } } } = queryData ? queryData[0] : [];

    const { state: { data: initalMovieData } } = queryData ? queryData[1] : [];


    const [genre, setGenre] = useState<number>(initalGenre && initalGenre[0].id);
    const [movieData, setMovieData] = useState(initalMovieData);


    const qkFilterMoviesByGenres = [MovieSearchService.FilterMovieByGenre.fnName, genre];


    const {
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        data,
        isLoading,
        isError,
        ...result
    } = useInfiniteQuery(
        qkFilterMoviesByGenres,
        async ({ pageParam = 1 }) => {
            const data = await MovieSearchService.FilterMovieByGenre(pageParam, genre);
            if (data) setMovieData(data.results);
            return data;
        },
        {
            getNextPageParam: (lastPage) => {
                const { page, total_pages: totalPages } = lastPage;
                return (page < totalPages) ? page + 1 : undefined;
            },
        }
    )


    const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

    const handleOnChange = (_: any, value: movieDataType) => {
        setGenre(value.id)
    };

    if (!data) return <div>Loading...</div>


    return (
        <>
            <Grid className="pt-40 flex px-8">
                <SelectGenre
                    name='genre'
                    label='select genre'
                    fullWidth
                    options={initalGenre}
                    getOptionLabel={(opt: any) => opt.name}
                    sx={{ width: 300 }}
                    onChange={handleOnChange}
                />
            </Grid>
            <Grid className="pt-20 px-40  flex flex-wrap  justify-center gap-4">
                {data?.pages ? data.pages.map((group: any, i: number) => {
                    return (
                        <Fragment key={i}>
                            {group.results.map((item: any) => {
                                return (<Grid key={item.id} className="relative w-[calc((100%_-_3rem)/4)] pt-[37.57%]  transition-all overflow-hidden [&>img]:hover:brightness-50 [&>div]:hover:top-1/2 ">
                                    <Image
                                        {...item.placeholder
                                        }
                                        alt="poster"
                                        placeholder={item.hasOwnProperty('placeholder') && 'blur'}
                                        src={`${imageURL}${item.poster_path}`}
                                        fill
                                        className="object-cover"
                                    />

                                    <div className="absolute text-center w-full -bottom-36">
                                        <Typography>{item.title}</Typography>
                                        <Button
                                            className="mt-10 tracking-widest font-bold"
                                            color="primary"
                                            variant="outlined"
                                        >
                                            <Link href={`/explore/${item.id}`}>
                                                view Detail
                                            </Link>
                                        </Button>
                                    </div>
                                </Grid>)
                            })}
                        </Fragment>

                    );
                }) : <div>Loading...</div>}
            </Grid>
            <Grid className="flex justify-center">
                <Button onClick={() => {
                    fetchNextPage()
                }} disabled={!hasNextPage} variant="outlined" color="primary" className="my-10 tracking-widest font-bold">{hasNextPage ? 'Load more' : "there's no more"}</Button>
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
        const imagePaths = data.results.map((item: any) => process.env.POSTER_URL + item.poster_path);
        const placeholderPromises = imagePaths.map(async (item: string) => {
            const { base64 } = await getPlaiceholder(item);
            return {
                blurDataURL: base64,
            };
        });
        const placeholders = await Promise.all(placeholderPromises);

        const result = data.results.map((item: any, index: number) => {
            return { ...item, placeholder: placeholders[index] }
        })


        return result;
    },);



    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60
    }

}

export default Explore;
