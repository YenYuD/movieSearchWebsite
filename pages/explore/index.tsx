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
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getPlaiceholder } from "plaiceholder";
import Head from "next/head";
import CircularProgress from '@mui/material/CircularProgress';

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

    // const { state: { data: initalMovieData } } = queryData ? queryData[1] : [];

    const [genre, setGenre] = useState<number>(initalGenre && initalGenre[0].id);


    const qkFilterMoviesByGenres = [MovieSearchService.FilterMovieByGenre.fnName, genre];

    const loader = useRef(null);


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
            return data;
        },
        {
            getNextPageParam: (lastPage) => {
                const { page, total_pages: totalPages } = lastPage;
                return (page < totalPages) ? page + 1 : undefined;
            },
        }
    )

    const handleObserver = useCallback((entries: any) => {

        const target = entries[0];
        if (target.isIntersecting) {
            console.log('fetching')
            fetchNextPage();
        }
    }, [fetchNextPage]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);

    }, [handleObserver, genre]);


    const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

    const handleOnChange = (_: any, value: movieDataType) => {
        setGenre(value.id)
    };

    if (!data) return <div>Loading...</div>


    return (
        <>
            <Head>
                <title>Explore movies</title>
                <meta name="description" content="A website for you to explore the latest movies with all kinds of genre..." />
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/png" href="/images/popcorn.png" />
            </Head>
            <Grid className="pt-40 flex px-16">
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
            <Grid className="pt-20 px-16  flex flex-wrap  justify-center gap-4">
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
            <Grid className="flex justify-center py-6" ref={loader}>
            </Grid>
            <Grid className="flex justify-center py-6">
                {isFetchingNextPage && <CircularProgress color="primary" />}
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
