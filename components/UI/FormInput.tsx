import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import React from 'react'
import { Controller } from 'react-hook-form';


const CssTextField = styled('input')(({ theme }) =>
    `
width: 100%;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
border-radius: 5px;
padding:1rem;
color:'#ffffff';
background: transparent;
border: 1px solid #ffffff;
letter-spacing:3px;

&:hover {
  border-color: '#ffffff';
}

&:focus{
    box-shadow: 0 0 0 0.5px white
}

@media screen and (max-width:640px){
    padding:0.5rem;
}

// firefox
&:focus-visible {
  outline: 0;
}
`,


);


const CustomInput = React.forwardRef(function CustomInput(
    props: InputUnstyledProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return (
        <InputUnstyled slots={{ input: CssTextField }} {...props} ref={ref} />
    );
});



const FormInput = (props: any) => {


    return (
        <>
            <Controller
                name={props.name}
                control={props.control}
                render={({ field: { ref, ...field } }) => (
                    <CustomInput
                        {...field}
                        autoComplete='false'
                        onFocus={props.onFocus}
                        className={props.className}
                        type={props.type}
                        required={props.required}
                        defaultValue={props.defaultValue}
                        placeholder={props.placeHolder}
                        disabled={props.disabled}
                    />
                )}
            />
        </>
    )
}

export default FormInput