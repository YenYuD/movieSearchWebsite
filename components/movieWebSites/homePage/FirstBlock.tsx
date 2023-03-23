import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";


const FirstBlock = () => {
    return (
        <>
            <div className="relative">
                <Image src='/images/thomas-william-4qGbMEZb56c-unsplash.jpg' alt="bg-image" fill style={{ objectPosition: '62% 0%' }} className="-z-10 pointer-events-none object-cover fixed"
                    sizes="(max-width: 768px) 300vw,
                        (max-width: 1200px) 100vw,
                        100vw"
                />
                <Grid className=" pl-5 lg:px-16 h-full max-sm:pt-[100%] sm:max-md:pt-[30vh]">
                    <Grid className="h-full md:pt-[30vh] text-transparent bg-gradient-to-r from-white bg-clip-text ">
                        <Typography component="h2" className="text-3xl md:text-6xl lg:text-7xl " >SEARCHING</Typography>
                        <Typography component="h2" className="text-3xl md:text-6xl lg:text-7xl" >FOR</Typography>
                        <Typography component="h2" className="text-3xl md:text-6xl lg:text-7xl" >MOVIES?</Typography>
                        <Typography component="h3" className=" mt-4 md:text-4xl lg:text-3xl">WELCOME TO MOVIE SEARCH WEBSITE.</Typography>
                    </Grid>
                    <Grid>
                        <Button variant="outlined" color="primary" className="my-10 tracking-widest font-bold"><Link href="/explore">Get Started</Link></Button>
                    </Grid>
                </Grid>
            </div>

        </>
    );
};

export default FirstBlock;
