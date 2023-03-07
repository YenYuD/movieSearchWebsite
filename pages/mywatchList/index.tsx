import axios from 'axios';
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

    const { data, error } = useSWR('https://nextjs-test-5d6fd-default-rtdb.firebaseio.com/users.json', fetcher);

    useEffect(() => {
        setLoading(true);
        if (data) {
            const transformedArr = [];

            for (const item in data) {
                transformedArr.push({ id: item, userID: data[item].userID, birthDay: data[item].birthDay, username: data[item].username })
            }

            setUser(transformedArr);
            setLoading(false);

        }

    }, [data])


    if (loading && !user) return <div>Loading...</div>

    if (error) return <div>Oops! something went wrong.</div>

    return (
        <div>{user.map((v: any) => {
            return <li key={v.userID}>{v.username}</li>
        })}</div>
    )
}


export async function getStaticProps() {

    const result = await axios.get('https://nextjs-test-5d6fd-default-rtdb.firebaseio.com/users.json').then((res) => {
        const transformedArr = [];

        const data = res.data;

        for (const item in data) {
            transformedArr.push({ id: item, userID: data[item].userID, birthDay: data[item].birthDay, username: data[item].username })
        }

        return transformedArr;
    });

    return {
        props: {
            userData: result
        },
        revalidate: 10
    }
}

export default WatchList