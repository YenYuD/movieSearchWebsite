import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import FormInput from '../../components/UI/FormInput'
import { useForm, } from "react-hook-form";
import axios from 'axios';

const LoginPage = () => {

    const { handleSubmit, reset, control } = useForm();

    const onSubmit = async (data: any) => {
        const result = await axios.post('/api/feedback', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }).then((res) => {
            return res.data;
        });

        if (result) { console.log('login successful!') };
    }

    return (
        <>
            <Grid className="flex justify-center pt-40">
                <Card className="bg-transparent border-white p-24 pt-0 overflow-visible" variant="outlined">
                    <Typography component="h6" color="primary" className="sm:text-3xl py-7 text-center -translate-y-11 bg-black " >LOGIN</Typography>
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