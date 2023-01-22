import React from 'react';
import { styled } from "@mui/material/styles";
import {
    Autocomplete, TextField
} from "@mui/material";

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


const SelectGenre = (props: any) => {


    return (
        <>
            <StyledAutoComplete
                fullWidth={props.fullWidth}
                options={props.options}
                onChange={props.onChange}
                getOptionLabel={props.getOptionLabel}
                noOptionsText="no option"
                sx={props.sx}
                renderInput={(params) => <TextField {...params} label={props.label} />}
            />
        </>
    )
}

export default SelectGenre