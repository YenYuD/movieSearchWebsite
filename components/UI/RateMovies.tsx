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

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            username: ''
        }
    });

    const { movieID } = props;

    const WhiteRatingIcon = styled(Rating)({
        '& .MuiRating-icon': {
            color: '#ffffff'
        }
    })

    const [rateValue, setRateValue] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (showSuccess) {
            setTimeout(() => { setShowSuccess(false) }, 1500)
        }

        if (showError) {
            setTimeout(() => { setShowError(false) }, 1500)
        }

    }, [showSuccess, showError])

    const onSubmit = async (data: any) => {

        const username = data.username;

        if (!rateValue && !username) {
            setShowError(true);
            setErrorMessage('you forgot to write your name and rate this movie !')
            return;
        }

        if (!rateValue) {
            setShowError(true);
            setErrorMessage('you forgot to rate this movie !')
            return;
        }

        if (!username) {
            setShowError(true);
            setErrorMessage('you forgot to write your name !')
            return;
        }

        setIsLoading(true);

        const rateInfo = { comment, rateValue, username, movieID }

        const URL = '/api/comments/' + movieID;

        const result = await axios.post(URL, rateInfo).then((res) => { const { status, data } = res; return { status, data } })

        if (result.status === 201) {
            setShowSuccess(true);

            setRateValue(null);
            setComment('')
            reset();
        } else {
            setShowError(true);
            setErrorMessage(result.data);
        }
        setIsLoading(false);

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
                    onFocus={() => { setShowError(false) }}
                    className="my-3 w-2/3"
                    name='username'
                    control={control}
                    required={true}
                    label="your name"
                    placeHolder="your name"
                    disabled={isLoading}
                    fullWidth
                />
                <UnstyledInputBasic disabled={isLoading} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value)} className="w-2/3 [&>textarea]:min-h-[117px] [&>textarea]:min-w-full " value={comment} aria-label="leave some comment about the movie!" multiline placeholder="Type something…" />
                <Alert className={` ${isLoading || showSuccess ? '' : 'hidden'} absolute bottom-1/3 w-1/2`} severity='success'>
                    {showSuccess ? 'done' : 'sending...'}
                </Alert>
                <Alert className={` ${!showError ? 'hidden' : ''} absolute bottom-1/3 w-1/2`} severity='error'>
                    {errorMessage}
                </Alert>
                <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} type="submit" variant="outlined" color="primary" className="my-10 tracking-widest" sx={{
                    "&.Mui-disabled": {
                        borderColor: "#ffffff",
                        color: '#666666'
                    }
                }}>Submit</Button>
            </Card>

        </Grid>
    )
}

export default RateMovies