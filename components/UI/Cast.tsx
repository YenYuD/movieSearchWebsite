import { Card, Grid, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'


const Cast = (props: any) => {

    const { castData } = props;

    const cast = castData ? castData.cast : [];

    const fallbackSrc = '/images/404.jpg'

    return (
        <>
            {cast.map((v: any) => {
                return (
                    <Card key={v.id} className=" mb-4 pb-4 w-[100px] bg-transparent">
                        <Grid className="w-full h-[120px] relative">
                            <Image src={v.profile_path ? process.env.NEXT_PUBLIC_POSTER_URL + v.profile_path : fallbackSrc} className={`object-cover  ${v.profile_path ? '' : "grayscale brightness-[0.4] "} `} fill alt="castPic" />
                        </Grid>
                        <Grid className="px-2 flex flex-col gap-2 break-words">
                            <Typography className="text-[10px] font-semibold ">{v.original_name}</Typography>
                            <Typography className="text-[9px] text-slate-400">{v.character}</Typography>
                        </Grid>
                    </Card>)
            })}

        </>
    )
}

export default Cast