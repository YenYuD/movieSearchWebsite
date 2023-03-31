import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { MovieSearchService } from "../../services/movieServices";
import Image from "next/image";
import {
    Button,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getPlaiceholder } from "plaiceholder";
import Head from "next/head";
import CircularProgress from '@mui/material/CircularProgress';
import FormInput from "../../components/UI/FormInput";
import { useForm } from "react-hook-form";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import React from "react";
import { ButtonUnstyled } from "@mui/base";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Select from "../../components/UI/Select";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";


const Explore = (props: any) => {

    const { t } = useTranslation('movieID');

    const { locale } = props;

    const form = useForm({
        defaultValues: {
            keyword: ''
        }
    });

    const { dehydratedState: { queries: queryData } } = props;

    const { state: { data: { genres: initalGenre } } } = queryData ? queryData[0] : [];


    const [genre, setGenre] = useState<number>(initalGenre && initalGenre[0].id);
    const [showBtn, setShowBtn] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setShowBtn(true);
        } else {
            setShowBtn(false);
        }
    };

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, [])


    const [searchMode, setSearchMode] = useState(false);
    const fallbackSrc = '/images/404.jpg'

    const keyword = form.watch('keyword')

    const qkFilterMoviesByGenres = [MovieSearchService.FilterMovieByGenre.fnName, genre, locale];
    const qkSearchMovie = [MovieSearchService.SearchMovie, keyword, locale];

    const loader = useRef(null);

    const { data: movieSearchData } = useQuery(qkSearchMovie, async () => {
        const res = await MovieSearchService.SearchMovie(keyword, locale);
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
            const data = await MovieSearchService.FilterMovieByGenre(pageParam, genre, locale);
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

        setGenre(value);
    };




    return (
        <>
            <Head>
                <title>Explore movies</title>
                <meta name="description" content="A website for you to explore the latest movies with all kinds of genre..." />
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/png" href="/images/popcorn.png" />
            </Head>
            <Typography component={'p'} className="pt-16 text-center text-sky-200 md:hidden">EXPLORE</Typography>
            <Grid className="lg:pt-40 pt-10 md:pt-24 flex flex-col sm:flex-row lg:px-16 px-8 items-center justify-start  sm:justify-center flex-wrap gap-3">
                <FormInput
                    className="flex w-full phone:w-[80%] md:w-1/2 sm:w-1/2 justify-center"
                    name="keyword"
                    control={form.control}
                    label={t('search')}
                    placeHolder={t('search')}
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
                <Select
                    className="phone:w-[80%] md:w-1/2 sm:w-1/2"
                    options={initalGenre}
                    defaultOptionLabel={t('genre')}
                    onChange={handleGenreOnChange}
                />
            </Grid>
            {!searchMode && <Grid className="pt-20 md:px-16 px-4  flex flex-wrap  justify-center gap-4">
                {data?.pages ? data.pages.map((group: any, i: number) => {
                    return (
                        <Fragment key={i}>
                            {group.results.map((item: any) => {
                                return (<Grid key={item.id} className="relative  lg:w-[calc((70%_-_3rem)/4)]  sm:w-[calc((60%_-_1rem)/2)] w-[80%] pt-[120.57%] phone:max-sm:w-[70%]  phone:max-sm:pt-[104.9%] sm:pt-[43.85%] lg:pt-[25%]  transition-all overflow-hidden [&>img]:hover:brightness-50 [&>div]:hover:top-1/2 ">
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

                                    <div className="absolute text-center w-full lg:px-2 -bottom-36">
                                        <Typography>{item.title}</Typography>
                                        <Button
                                            className="mt-10 tracking-widest font-bold"
                                            color="primary"
                                            variant="outlined"
                                        >
                                            <Link href={`/explore/${item.id}`}>
                                                {t('view Detail')}
                                            </Link>
                                        </Button>
                                    </div>
                                </Grid>)
                            })}
                        </Fragment>

                    );
                }) : <div>Loading...</div>}
            </Grid>}
            {searchMode && <Grid className="pt-20 md:px-16 px-4  flex flex-wrap  justify-center gap-4">
                {!!movieSearchData && movieSearchData.results.map((item: any) => {
                    return (
                        (<Grid key={item.id} className="relative  lg:w-[calc((70%_-_3rem)/4)]  sm:w-[calc((60%_-_1rem)/2)] w-[80%] pt-[120.57%] phone:max-sm:w-[60%]  phone:max-sm:pt-[78.9%] sm:pt-[43.85%] lg:pt-[25%]  transition-all overflow-hidden [&>img]:hover:brightness-50 [&>div]:hover:top-1/2 ">
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
                                className={`object-cover  ${item.poster_path ? '' : "grayscale brightness-[0.4] object-right-top"} `}
                            />

                            <div className="absolute text-center w-full lg:px-2 -bottom-36">
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
            <ButtonUnstyled className={`${showBtn ? '' : 'hidden'} before:content-['^'] before:animate-bounce before:absolute before:top-1 before:left-[41%] before:text-lg p-4 border border-white rounded-full fixed bottom-6 right-6`} onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }}>top</ButtonUnstyled>
            <Grid className="flex justify-center py-6">
                {isFetchingNextPage && <CircularProgress color="primary" />}
            </Grid>
            <Grid className="flex justify-center py-6 loader" ref={loader}>
            </Grid>
        </>
    );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => {
    const queryClient = new QueryClient();

    const initalGenreID = 28

    const qkMovieGernes = [MovieSearchService.GetAllGernes.fnName, locale];

    const qkFilterMoviesByGenres = [MovieSearchService.FilterMovieByGenre.fnName, initalGenreID, locale];

    await queryClient.prefetchQuery(qkMovieGernes, async () => {
        const data = await MovieSearchService.GetAllGernes(locale!);
        return data;
    });

    await queryClient.prefetchQuery(qkFilterMoviesByGenres, async () => {
        const data = await MovieSearchService.FilterMovieByGenre(1, initalGenreID, locale);
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
            ...(await serverSideTranslations(locale!, [
                'Nav', 'movieID'
            ])),
            dehydratedState: dehydrate(queryClient),
            locale,
        },
        revalidate: 60
    }

}

export default Explore;
