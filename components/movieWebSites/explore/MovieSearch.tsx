import { Autocomplete, styled, TextField } from '@mui/material'
import React from 'react'

const StyledAutoComplete = styled(Autocomplete)({
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
            <StyledAutoComplete
                fullWidth={props.fullWidth}
                onChange={props.onChange}
                sx={props.sx}
                renderInput={(params: any) => <TextField {...params} label={props.label} />} />
        </>
    )
}

export default MovieSearch