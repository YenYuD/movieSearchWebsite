import React from "react";
import FirstBlock from "./FirstBlock";
import SecondBlock from "./SecondBlock";
import ThirdBlock from "./ThirdBlock";
import { Grid } from "@mui/material";
import FourthBlock from "./FourthBlock";

const MovieHomePage = () => {
    return (
        <>
            <Grid className="pb-40">
                <FirstBlock />
                {/* <div className="divider my-20 h-0.5"></div>
                <SecondBlock />
                <div className="divider my-20 h-0.5"></div>
                <ThirdBlock />
                <div className="divider my-20 h-0.5"></div>
                <FourthBlock /> */}
            </Grid>
        </>
    );
};

export default MovieHomePage;
