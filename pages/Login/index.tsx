import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import FormInput from '../../components/UI/FormInput'
import { useForm, } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/router';
import NotificationContext, { NotificationStatusType } from '../../store/notification-context';
import Image from "next/image";


async function createUser(email: string, password: string) {
    const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'something went wrong!');
    }

    return data;
}

const LoginPage = () => {

    const [loading, setLoading] = useState(false);
    const [signIn, setSignIn] = useState(false);

    const router = useRouter();

    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function switchToSignIn() {
        setSignIn(!signIn);
    }

    const notificationCtx = useContext(NotificationContext);

    const onSubmit = async (data: any) => {

        setLoading(true);

        const { email, password } = data;

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;


        if (!email || !password ||
            !emailRegex.test(email) ||
            !passwordRegex.test(password.trim())) {
            notificationCtx.showNotification({
                title: 'invalid email or password.',
                message: 'please check again.',
                status: NotificationStatusType.error
            })
            setLoading(false);
            return;
        }

        if (signIn) {
            try {
                notificationCtx.showNotification({
                    title: 'creating user...',
                    message: 'please wait.',
                    status: NotificationStatusType.pending
                })
                const result = await createUser(email, password);

                const { success } = result;

                if (success) {
                    notificationCtx.showNotification({
                        title: 'signed up successfully!',
                        message: 'user created.please login.',
                        status: NotificationStatusType.success
                    })

                    setSignIn(false)
                    reset();

                } else {

                }

            } catch (err) {
                console.log(err)
                notificationCtx.showNotification({
                    title: 'Error:',
                    message: 'user exsisted already.',
                    status: NotificationStatusType.error
                })
            } finally {
                setLoading(false);
            }


        }

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
                    <Grid className="bg-black/50 max-md:rounded-2xl md:bg-transparent border-white p-8  md:pt-0 overflow-visible max-w-1/2" >
                        <Typography component="h6" color="primary" className="sm:text-3xl text-2xl py-7 text-center " >{signIn ? 'SIGN IN' : 'LOGIN'}</Typography>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            className="flex max-md:p-8 flex-col gap-12 p-20  rounded-xl"
                        >

                            <FormInput
                                name={"email"}
                                control={control}
                                required={true}
                                label="email"
                                placeHolder="your email"
                                disabled={loading}
                            />
                            <FormInput
                                name={"password"}
                                control={control}
                                type="password"
                                required={true}
                                label="PASSWORD"
                                placeHolder="your password"
                                disabled={loading}
                            />
                            <Grid>
                                <Typography className="text-[10px]">passsword requirement:</Typography>
                                <Typography className="text-[10px] ">minimum eight characters, at least one uppercase letter, one lowercase letter and one number</Typography>
                            </Grid>
                            <Button className="tracking-widest" onClick={switchToSignIn}>{signIn ? 'LOGIN HERE' : 'CREATE NEW ACCOUNT'}</Button>
                            <Grid className="text-center flex justify-evenly gap-8">
                                <Button onClick={() => { reset() }} type="button" variant="outlined" color="warning" className=" tracking-widest"> Reset</Button>
                                <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outlined" color="primary" className=" tracking-widest" disabled={loading}> Submit</Button>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>

            </Grid>


        </>
    )
}

export default LoginPage