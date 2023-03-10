import React from "react";
import Image from "next/image";
import filmCamera from "/public//images/thomas-william-4qGbMEZb56c-unsplash.jpg";
import { Button, createTheme, Grid, Typography } from "@mui/material";
import { url } from "inspector";
import Link from "next/link";



const FirstBlock = () => {
    return (
        <>
            <div className="bg-cover" style={{ backgroundImage: 'url(/images/thomas-william-4qGbMEZb56c-unsplash.jpg)', height: '100vh' }}>
                <Grid className="px-16">
                    <div className="h-[30vh]"></div>
                    <Grid className="text-transparent bg-gradient-to-r from-white bg-clip-text ">
                        <Typography component="h2" className="sm:text-3xl md:text-6xl lg:text-9xl" >SEARCHING</Typography>
                        <Typography component="h2" className="sm:text-3xl md:text-6xl lg:text-9xl" >FOR</Typography>
                        <Typography component="h2" className="sm:text-3xl md:text-6xl lg:text-9xl" >MOVIES?</Typography>
                        <Typography >WELCOME TO TMDB MOVIE DATABASE.</Typography>
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
