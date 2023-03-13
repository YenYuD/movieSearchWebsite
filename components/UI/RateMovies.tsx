import { Alert, Box, Button, Card, Grid, Rating, styled, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from './FormInput'
import UnstyledInputBasic from './TextArea'

interface RateMovieProps {
    movieID: string
}

const RateMovies = (props: RateMovieProps) => {

    const { handleSubmit, control } = useForm();


    const { movieID } = props;

    const WhiteRatingIcon = styled(Rating)({
        '& .MuiRating-icon': {
            color: '#ffffff'
        }
    })

    const [rateValue, setRateValue] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {

        if (showSuccess) {
            setTimeout(() => { setShowSuccess(false) }, 500)
        }

    }, [showSuccess])

    const onSubmit = async (data: any) => {
        if (!rateValue || !data) return;

        const username = data.username;
        const rateInfo = { comment, rateValue, username, movieID }

        const URL = '/api/comments/' + movieID;

        const result = await axios.post(URL, rateInfo).then((res) => { return res.status })

        if (result === 201) setShowSuccess(true);

        setRateValue(null);
        setComment('')

    }

    return (
        <Grid className=" flex-1 basis-1/2">
            <Card className="relative bg-transparent h-full border-white px-24 flex flex-col items-center" variant="outlined">
                <Typography component={'h6'} color="primary" className="py-7 sm:text-3xl whitespace-nowrap"> Leave some comments?</Typography>

                <Grid className="flex my-4">

                    <Typography className="pr-2" component={'legend'} color="primary" >Rate the movie:</Typography>
                    <WhiteRatingIcon
                        className="-translate-y-1"
                        size="large"
                        name="simple-controlled"
                        precision={0.5}
                        value={rateValue}
                        onChange={(event, newValue) => {
                            setRateValue(newValue);
                        }}
                    />
                </Grid>
                <FormInput
                    className="m-3 w-1/2"
                    name={"username"}
                    control={control}
                    required={true}
                    label="your name"
                    placeHolder="your name"
                />
                <UnstyledInputBasic onChange={(event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value)} className="w-1/2 [&>textarea]:min-h-[117px] [&>textarea]:min-w-full" value={comment} aria-label="leave some comment about the movie!" multiline placeholder="Type something…" />
                <Alert className={` ${!showSuccess ? 'hidden' : ''} absolute bottom-1/3`} severity='success'>
                    done!
                </Alert>
                <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outlined" color="primary" className="my-10 tracking-widest">Submit</Button>
            </Card>

        </Grid>
    )
}

export default RateMovies