import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { MovieSearchService } from "../../services/movieServices";
import Image from "next/image";
import {
    Autocomplete,
    Button,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import Link from "next/link";
import SelectGenre from "../../components/UI/SelectGenre";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getPlaiceholder } from "plaiceholder";
import Head from "next/head";
import CircularProgress from '@mui/material/CircularProgress';
import FormInput from "../../components/UI/FormInput";
import { useForm } from "react-hook-form";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';



const Explore = (props: any) => {

    const form = useForm({
        defaultValues: {
            keyword: ''
        }
    });

    const { dehydratedState: { queries: queryData } } = props;

    const { state: { data: { genres: initalGenre } } } = queryData ? queryData[0] : [];


    const [genre, setGenre] = useState<number>(initalGenre && initalGenre[0].id);
    const [searchMode, setSearchMode] = useState(false);
    const fallbackSrc = '/images/404.jpg'

    const keyword = form.watch('keyword')

    const qkFilterMoviesByGenres = [MovieSearchService.FilterMovieByGenre.fnName, genre];
    const qkSearchMovie = [MovieSearchService.SearchMovie, keyword];

    const loader = useRef(null);

    const { data: movieSearchData } = useQuery(qkSearchMovie, async () => {
        const res = await MovieSearchService.SearchMovie(keyword);
        return res;
    }, { enabled: !!searchMode });

    useEffect(() => {
        if (keyword) {
            setSearchMode(true)
        }

        if (!keyword) {
            setSearchMode(false)
        }

    }, [keyword])


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

            fetchNextPage();
        }
    }, [fetchNextPage]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "40px",
            threshold: 0
        };

        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) { observer.observe(loader.current); }

    }, [handleObserver, genre]);


    const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

    const handleGenreOnChange = (_: any, value: any) => {
        setGenre(value.props.value);
    };




    return (
        <>
            <Head>
                <title>Explore movies</title>
                <meta name="description" content="A website for you to explore the latest movies with all kinds of genre..." />
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/png" href="/images/popcorn.png" />
            </Head>
            <Grid className="pt-40 flex px-16 items-center justify-center">
                <FormInput
                    className="m-3 w-1/2"
                    name="keyword"
                    control={form.control}
                    label="search movie"
                    placeHolder="search movie"
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={() => { form.reset() }}
                            >
                                <HighlightOffOutlinedIcon color="primary" />
                            </IconButton>
                        ),
                    }}
                />
                <Typography component={'p'} color="primary" className="text-center" >or</Typography>
                <SelectGenre
                    name='genre'
                    label='select genre'
                    fullWidth
                    options={initalGenre}
                    getOptionLabel={(opt: any) => opt.name}
                    sx={{ width: 300 }}
                    onChange={handleGenreOnChange}
                />
            </Grid>
            {!searchMode && <Grid className="pt-20 px-16  flex flex-wrap  justify-center gap-4">
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
                                        sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
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
            </Grid>}
            {searchMode && <Grid className="pt-20 px-16  flex flex-wrap  justify-center gap-4">
                {!!movieSearchData && movieSearchData.results.map((item: any) => {
                    return (
                        (<Grid key={item.id} className="relative w-[calc((100%_-_3rem)/4)] pt-[37.57%]  transition-all overflow-hidden [&>img]:hover:brightness-50 [&>div]:hover:top-1/2 ">
                            <Image
                                {...item.placeholder
                                }
                                alt="poster"
                                placeholder={item.hasOwnProperty('placeholder') && 'blur'}
                                src={item.poster_path ? `${imageURL}${item.poster_path}` : fallbackSrc}
                                fill
                                sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                className={`object-cover ${item.poster_path ? '' : "grayscale brightness-[0.4] object-right-top"} `}
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
                    )
                }
                )}
            </Grid>}
            <Grid className="flex justify-center py-6">
                {isFetchingNextPage && <CircularProgress color="primary" />}
            </Grid>
            <Grid className="flex justify-center py-6 loader" ref={loader}>
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
