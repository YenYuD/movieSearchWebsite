import { Alert, Box, Button, Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';

const SuscribeInput = (props: any) => {

    const { showAlert, setShowAlert, showSuccess, setShowSuccess } = props;

    const { handleSubmit, reset, control } = useForm();


    const onSubmit = async (data: any) => {

        const email = data.userEmail;

        if (!email || !email.includes('@')) {
            setShowAlert(true);
            return;
        }

        const result = await axios.post('/api/suscribe', data).then((res) => res.status);

        if (result === 200) setShowSuccess(true);

    }

    return (
        <Grid className=" flex-1 basis-1/2" >
            <Card className="bg-transparent border-white  px-24 pt-0 overflow-visible flex flex-col justify-center" variant="outlined">
                <Typography component="h6" color="primary" className="sm:text-3xl py-7 text-center  " >Suscribe us !</Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    className="flex justify-center"
                >
                    <FormInput
                        className="justify-center"
                        name={"userEmail"}
                        control={control}
                        required={true}
                        label="Email"
                        placeHolder="your email"
                        onFocus={() => { setShowAlert(false); setShowSuccess(false) }}
                    />
                </Box>
                <Alert className={`mt-5 ${!showAlert && !showSuccess ? 'hidden' : ''}`} severity={showAlert ? 'error' : 'success'}>
                    {showAlert ? 'not valid email! please try again.' : 'suscribe successfully!'}
                </Alert>
                <Grid className="text-center flex justify-evenly">
                    <Button onClick={handleSubmit(onSubmit)} type="submit" variant="outlined" color="primary" className="my-10 tracking-widest">Suscribe</Button>
                </Grid>
            </Card>
        </Grid>
    )
}

export default SuscribeInput