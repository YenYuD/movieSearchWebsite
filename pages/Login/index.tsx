import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import FormInput from '../../components/UI/FormInput'
import { useForm, } from "react-hook-form";
import axios from 'axios';
import NotificationContext, { NotificationStatusType } from '../../store/notification-context';
import { useRouter } from 'next/router';
import Image from "next/image";

const LoginPage = () => {

    const { handleSubmit, reset, control } = useForm();

    const notificationCtx = useContext(NotificationContext);

    const onSubmit = async (data: any) => {

        notificationCtx.showNotification({
            title: 'sorry!',
            message: 'this page is still developing, soon will be done!',
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
            <Image src='/images/rick-davis-Nd-ptAdv-hY-unsplash.jpg' alt="bg-image" fill className="-z-10 pointer-events-none object-cover md:w-1/2"
                sizes="(max-width: 768px) 300vw,
                        (max-width: 1200px) 100vw,
                        100vw"
            />
            <Grid className=" mb-10 flex md:justify-between md:max-lg:gap-8 justify-center pt-28 md:pt-40  ">
                <Grid className=" max-md:hidden "></Grid>
                <Grid className="flex md:w-1/2 justify-center">
                    <Grid className="bg-black/50 max-md:rounded-2xl md:bg-transparent border-white p-8  md:pt-0 overflow-visible" >
                        <Typography component="h6" color="primary" className="sm:text-3xl text-2xl py-7 text-center " >LOGIN</Typography>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            className="flex max-md:p-8 flex-col gap-12 p-20 md:border-white md:border rounded-xl"
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
                            <Grid className="text-center flex justify-evenly gap-8">
                                <Button onClick={reset} type="button" variant="outlined" color="warning" className=" tracking-widest"> Reset</Button>
                                <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outlined" color="primary" className=" tracking-widest"> Submit</Button>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>

            </Grid>


        </>
    )
}

export default LoginPage