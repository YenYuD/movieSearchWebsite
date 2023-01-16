import { Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import blurImage from "/public/images/max-fuchs-Nm6ojlDO-5c-unsplash.jpg";
import { Grid } from "@mui/material";

const ThirdBlock = () => {
    return (
        <>
            <Grid className="h-screen px-16 relative">
                <Image
                    src={blurImage}
                    alt="blurImage"

                    className="rotate-90 w-[20vw] absolute left-1/2 right-1/2 -translate-x-1/2 -translate-y-24"
                />
                <Typography
                    variant="h2"
                    className="translate-y-24 mix-blend-difference pl-32 py-12"
                >
                    SCI-FI, THRILL , COMEDY ,ROMANCE...
                </Typography>
                <Typography
                    variant="h2"
                    className="translate-y-24 mix-blend-difference text-end pr-44"
                >
                    ANY GENRE YOU CAN THINK.
                </Typography>
            </Grid>
        </>
    );
};

export default ThirdBlock;
