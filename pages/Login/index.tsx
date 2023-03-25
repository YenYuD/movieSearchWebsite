import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import FormInput from '../../components/UI/FormInput'
import { useForm, } from "react-hook-form";
import axios from 'axios';
import NotificationContext, { NotificationStatusType } from '../../store/notification-context';
import { useRouter } from 'next/router';

const LoginPage = () => {

    const router = useRouter();

    useEffect(() => {
        const { pathname } = router;

        if (pathname !== pathname.toLowerCase()) {
            router.push(pathname.toLowerCase())
        }
    }, [router])

    const { handleSubmit, reset, control } = useForm();

    const notificationCtx = useContext(NotificationContext);

    const onSubmit = async (data: any) => {

        notificationCtx.showNotification({
            title: 'sorry!',
            message: 'function still developing, soon will be done!',
            status: NotificationStatusType.error
        })

        return;

        const result = await axios.post('/api/feedback', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }).then((res) => {
            return res.data;
        });

        if (result) { console.log('login successful!') };
    }

    return (
        <>
            <Grid className="flex justify-center pt-28 md:pt-40">
                <Card className="bg-transparent border-white p-8  md:p-24 md:pt-0 overflow-visible" variant="outlined">
                    <Typography component="h6" color="primary" className="sm:text-3xl py-7 text-center md:-translate-y-11 -translate-y-18 bg-black " >LOGIN</Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        className="flex flex-col gap-12"
                    >
                        <FormInput
                            name={"username"}
                            control={control}
                            required={true}
                            label="USERNAME"
                            placeHolder="your username"
                        />
                        <FormInput
                            name={"password"}
                            control={control}
                            type="password"
                            required={true}
                            label="PASSWORD"
                            placeHolder="your password"
                        />
                    </Box>
                    <Grid className="text-center flex justify-evenly">
                        <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outlined" color="primary" className="my-10 tracking-widest"> Submit</Button>
                        <Button onClick={reset} type="button" variant="outlined" color="warning" className="my-10 tracking-widest"> Reset</Button>
                    </Grid>
                </Card>
            </Grid>


        </>
    )
}

export default LoginPage