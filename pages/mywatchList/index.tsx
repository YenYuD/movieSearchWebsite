import { Typography } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


interface UserType {
    userID: number,
    username: string,
    birthDay: string
}

interface PropsType {
    userData: UserType[]
}

const WatchList = (props: PropsType) => {

    const { userData } = props;

    const [user, setUser] = useState<UserType[]>(userData);
    const [loading, setLoading] = useState(false);

    const fetcher = (url: string) => axios.get(url).then((res) => {
        return res.data;
    });

    // const { data, error } = useSWR('https://nextjs-test-5d6fd-default-rtdb.firebaseio.com/users.json', fetcher);

    // useEffect(() => {
    //     setLoading(true);
    //     if (data) {
    //         const transformedArr = [];

    //         for (const item in data) {
    //             transformedArr.push({ id: item, userID: data[item].userID, birthDay: data[item].birthDay, username: data[item].username })
    //         }

    //         setUser(transformedArr);
    //         setLoading(false);

    //     }

    // }, [data])


    if (loading && !user) return <><Head>
        <title>My WatchList</title>
        <meta name="description" content="A website for you to explore the latest movies with all kinds of genre..." />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/images/popcorn.png" />
    </Head><div>Loading...</div></>

    // if (error) return <div>Oops! something went wrong.</div>

    return (

        <>
            <Head>
                <title>My WatchList</title>
                <meta name="description" content="A website for you to explore the latest movies with all kinds of genre..." />
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/png" href="/images/popcorn.png" />
            </Head>
            <div className="h-screen flex justify-center items-center">
                <Typography >
                    頁面開發中。敬請期待。
                </Typography>
            </div>

        </>
    )
}



export default WatchList