import { styled, TextField } from '@mui/material'
import React from 'react'

const StyledTextField = styled(TextField)({
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
        color: '#ffffff'
    },
    "& .MuiInputLabel-outlined": {
        color: '#ffffff'
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
        color: "#ffffff"
    },
    "& .MuiAutocomplete-inputRoot": {
        color: "#ffffff",
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            // Default left padding is 6px
            paddingLeft: '30px'
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
            borderRadius: '30px!important'
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
            borderWidth: '1px'
        }
    },
    "& .MuiAutocomplete-endAdornment": {
        "& .MuiSvgIcon-root": {
            color: '#ffffff'
        }
    }
});


const MovieSearch = (props: any) => {
    return (
        <>
            <StyledTextField id="outlined-basic" label={props.label} variant="outlined" />
        </>
    )
}

export default MovieSearch