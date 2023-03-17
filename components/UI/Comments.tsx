import { Card, Grid, Typography, Rating, Divider } from '@mui/material';
import React from 'react'
import { styled } from '@mui/material';

const Comment = (props: any) => {
    const WhiteRatingIcon = styled(Rating)({
        '& .MuiRating-icon': {
            color: '#ffffff'
        }
    })

    return (
        <Card className="relative bg-transparent h-full items-center border-white p-2 flex shrink-0 grow-0 basis-[20%]" variant="outlined">
            <Grid className="flex flex-col  items-center shrink-0 basis-[35%] lg:basis-[20%]">
                <Typography component={'p'} color="primary" className="">{props.id}</Typography>
                <WhiteRatingIcon
                    // className="-translate-y-1"
                    size="small"
                    name="simple-controlled"
                    precision={0.5}
                    value={props.rateValue}
                    readOnly
                />
                <Typography component={'p'} color="primary">
                    {props.rateValue} stars
                </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem color="#ffffff" className="my-1 mx-2" />
            <Typography component={'p'} color="primary" className="text-center break-all">
                {props.comment}
            </Typography>
        </Card>

    )
}


export default Comment