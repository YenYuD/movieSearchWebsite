import { Box, Card, Grid, Rating, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import UnstyledInputBasic from './TextArea'

const RateMovies = () => {

    const WhiteRatingIcon = styled(Rating)({
        '& .MuiRating-icon': {
            color: '#ffffff'
        }
    })

    const [value, setValue] = useState<number | null>(null);
    return (
        <Grid className=" flex-1 basis-1/2">
            <Card className="bg-transparent h-full border-white px-24 flex flex-col items-center" variant="outlined">
                <Typography component={'h6'} color="primary" className="py-7 sm:text-3xl whitespace-nowrap"> Leave some comments?</Typography>
                <Grid className="flex my-4">
                    <Typography className="pr-2" component={'legend'} color="primary" >Rate the movie:</Typography>
                    <WhiteRatingIcon
                        className="-translate-y-1"
                        size="large"
                        name="simple-controlled"
                        precision={0.5}
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Grid>

                <UnstyledInputBasic className="mb-5" aria-label="leave some comment about the movie!" multiline placeholder="Type something…" />
            </Card>

        </Grid>
    )
}

export default RateMovies