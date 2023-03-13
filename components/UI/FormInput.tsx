import { Box, Grid, IconButton, TextField } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { getValue } from '@mui/system';

const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        paddingLeft: '14px',
        color: theme.palette.primary.light,
    },
    '& .MuiOutlinedInput-input': {
        color: theme.palette.primary.light,
        paddingLeft: '24px',
    },
    '& .MuiInputBase-root': {
        color: theme.palette.primary.light,
    },
    '& label.Mui-focused': {
        color: theme.palette.primary.light,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.primary.light,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '5px',
            borderColor: theme.palette.primary.light,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.light,
        },
    },

}));

const FormInput = (props: any) => {


    return (
        <>
            <Controller
                name={props.name}
                control={props.control}
                render={({ field: { onChange, value } }) => (
                    <CssTextField
                        onFocus={props.onFocus}
                        fullWidth={props.fullWidth}
                        className={props.className}
                        onChange={onChange}
                        type={props.type}
                        required={props.required}
                        label={props.label}
                        value={value}
                        defaultValue={props.defaultValue}
                        placeholder={props.placeHolder}
                        InputProps={props.InputProps}
                    />
                )}
            />
        </>
    )
}

export default FormInput