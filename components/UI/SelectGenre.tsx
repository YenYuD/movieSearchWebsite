import React from 'react';
import { styled } from "@mui/material/styles";
import {
    Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField
} from "@mui/material";



const StyledSelect = styled(Select)({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white'
    },
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '& .MuiSelect-outlined': {
        color: 'white',
        borderColor: 'white'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white'
    },
})


const SelectGenre = (props: any) => {


    return (
        <>
            <Box sx={{ minWidth: 120 }} className="px-3">
                <FormControl fullWidth>
                    <InputLabel className="text-white pl-2" id="demo-simple-select-label">{props.name}</InputLabel>
                    <StyledSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        label={props.label}
                        onChange={props.onChange}
                        sx={props.sx}
                    >
                        {props.options.map((item: any) => {
                            return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                        })}
                    </StyledSelect>
                </FormControl>
            </Box>

        </>
    )
}

export default SelectGenre