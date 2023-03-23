import { Alert, Box, Button, Card, Grid, Rating, styled, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import NotificationContext from '../../store/notification-context'
import FormInput from './FormInput'
import UnstyledInputBasic from './TextArea'
import { NotificationStatusType } from '../../store/notification-context'

interface RateMovieProps {
    movieID: string
}

const RateMovies = (props: RateMovieProps) => {

    const notificationCtx = useContext(NotificationContext);


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
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const onSubmit = async (data: any) => {

        setIsLoading(true);

        const username = data.username;

        notificationCtx.showNotification({
            title: 'sending...',
            message: 'please wait...',
            status: NotificationStatusType.pending
        })

        if (!rateValue && !username) {
            notificationCtx.showNotification({
                title: 'You missed something!',
                message: "please check agin.",
                status: NotificationStatusType.error
            })
            setIsLoading(false);
            return;
        }

        if (!rateValue) {
            notificationCtx.showNotification({
                title: 'You missed something!',
                message: "please check again.",
                status: NotificationStatusType.error
            })
            setIsLoading(false);
            return;
        }

        if (!username) {
            notificationCtx.showNotification({
                title: 'You missed something!',
                message: "please check again.",
                status: NotificationStatusType.error
            })
            setIsLoading(false);
            return;
        }

        const rateInfo = { comment, rateValue, username, movieID }

        const URL = '/api/comments/' + movieID;

        const result = await axios.post(URL, rateInfo).then((res) => { const { status, data } = res; return { status, data } }).catch((err) => {

            notificationCtx.showNotification({
                title: 'Oops!',
                message: err || 'something went wrong.',
                status: NotificationStatusType.error
            })

            throw new Error(err);
        })

        if (result.status === 201) {

            setRateValue(null);
            setComment('')
            reset();

            notificationCtx.showNotification({
                title: 'success!',
                message: 'comment sent successfully.',
                status: NotificationStatusType.success
            })

        } else {
            notificationCtx.showNotification({
                title: 'Oops!',
                message: 'something went wrong.',
                status: NotificationStatusType.error
            })
        }

        setIsLoading(false);

    }

    return (
        <Grid className=" flex-1 basis-1/2 ">
            <Card className="relative px-6 bg-transparent h-full border-white lg:px-24 flex flex-col items-center" variant="outlined">
                <Typography component={'h6'} color="primary" className="py-7 sm:text-3xl whitespace-nowrap"> Leave some comments?</Typography>
                <Grid className="flex my-4 gap-2 flex-wrap justify-center md:flex-nowrap">
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
                    className="my-3 w-full lg:w-2/3"
                    name='username'
                    control={control}
                    required={true}
                    label="your name"
                    placeHolder="your name"
                    disabled={isLoading}
                    fullWidth
                />
                <UnstyledInputBasic disabled={isLoading} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value)} className="w-full lg:w-2/3 [&>textarea]:min-h-[117px] [&>textarea]:min-w-full " value={comment} aria-label="leave some comment about the movie!" multiline placeholder="Type something…" />
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