import React from "react";
import Image from "next/image";
import filmImage from "/public/images/rick-davis-Nd-ptAdv-hY-unsplash.jpg";
import { Button, createTheme, Grid, Typography } from "@mui/material";
const SecondBlock = () => {
    return (
        <>
            <Grid className="px-16 h-screen  relative ">
                <Grid className="flex flex-col">
                    <Typography className="w-1/3 translate-x-44 pt-20">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Porro molestiae harum facilis, sed enim odit rem alias?
                        Praesentium, quibusdam dolor. Vel, molestias, et facere
                        repellat quasi veritatis eligendi similique nobis illo
                        aperiam mollitia aliquid unde! Fuga saepe ipsa, a totam
                        blanditiis aliquam praesentium deleniti nobis
                        repudiandae qui impedit doloremque aspernatur?
                    </Typography>
                    <Image
                        className=" second self-center absolute -z-10 flex-none"
                        src={filmImage}
                        alt="filmImage"
                        width={500}
                        height={500}
                    />
                    <Typography className="w-1/3 self-end  -translate-x-44">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Porro molestiae harum facilis, sed enim odit rem alias?
                        Praesentium, quibusdam dolor. Vel, molestias, et facere
                        repellat quasi veritatis eligendi similique nobis illo
                        aperiam mollitia aliquid unde! Fuga saepe ipsa, a totam
                        blanditiis aliquam praesentium deleniti nobis
                        repudiandae qui impedit doloremque aspernatur?
                    </Typography>
                </Grid>
                <Grid className="h-[100vh] absolute top-0 right-0 left-0 bg-gradient-to-t -z-20  from-orange-400 opacity-30 blur-3xl"></Grid>
            </Grid>
        </>
    );
};

export default SecondBlock;
