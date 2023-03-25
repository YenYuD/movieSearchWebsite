import React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';


const StyledButton = styled('button')(
  ({ theme }) => `
    font-size: 1rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    width:100%;
    padding: 1rem;
    letter-spacing:3px;
    border-radius: 5px;
    text-align: left;
    border: 1px solid white;
    color: white;
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;

    @media screen and (max-width:640px){
        padding:0.5rem;
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      border-color: white;
      outline: 2px solid white;
    }
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }

    @media screen and  (min-width: 400px) {
        
            width: 80% !important;
        
    }

    @media screen and (min-width: 768px) {
       
            width: 50% !important;
        
    }

    @media screen and (min-width: 640px) {
       
            width: 30% !important;
        
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 320px;
    max-height:40vh;
    border-radius: 5px;
    overflow: auto;
    outline: 0px;
    border: 1px solid white;
    color:white;
    background-color:black;
    position:relative;
    cursor: pointer;

    @media screen and (max-width:640px){
        min-width:200px;
    }


    `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;

  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionUnstyledClasses.selected} {
      color:white;
    }
  
    &.${optionUnstyledClasses.highlighted} {
      color: white;
    }
  
    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      color:white;
    }
  
    &.${optionUnstyledClasses.disabled} {
      color:#666666
    }
  
    &:hover:not(.${optionUnstyledClasses.disabled}) {

      color: white;
    }
    `,
);

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
  `;

const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectUnstyledProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const slots: SelectUnstyledProps<TValue, Multiple>['slots'] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} ref={ref} slots={slots} />;
}) as <TValue extends {}, Multiple extends boolean>(
  props: SelectUnstyledProps<TValue, Multiple> &
    React.RefAttributes<HTMLButtonElement>,
) => JSX.Element;



const SelectGenre = (props: any) => {


  return (
    <>
      <CustomSelect defaultValue={0} onChange={props.onChange} className={props.clasName}>
        <StyledOption value={0} disabled label='genre' ></StyledOption>
        {props.options.map((v: any) =>
          <StyledOption key={v.id} value={v.id}>{v.name}</StyledOption>
        )}
      </CustomSelect>

    </>
  )
}

export default SelectGenre