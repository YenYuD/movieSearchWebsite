import { TextField } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';


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
    '& .Mui-disabled': {
        color: theme.palette.primary.light,
        borderColor: theme.palette.primary.light,
    },
    '& > .MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled ': {
        color: theme.palette.primary.light,
        borderColor: theme.palette.primary.light,
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
                        autoComplete='false'
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
                        disabled={props.disabled}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#ffffff",
                            },
                            '& .MuiInputBase-input.Mui-disabled > *': {
                                color: '#ffffff'
                            }
                        }}
                    />
                )}
            />
        </>
    )
}

export default FormInput