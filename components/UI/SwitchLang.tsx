import React, { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { styled } from '@mui/system';
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

const SwitchLang = () => {

  const { i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames(currentLanguage, {
      type: 'language',
    });
  }, [currentLanguage]);

  function capitalize(lang: string) {
    return lang.slice(0, 1).toUpperCase() + lang.slice(1);
  }

  const switchToLocale = useCallback(
    (locale: any) => {
      const path = router.asPath;

      return router.push(path, path, { locale, scroll: false });
    },
    [router]
  );

  const StyledButton = styled('button')(
    ({ theme }) => `
          font-size: 0.9rem;
          box-sizing: border-box;
          width:100%;
          flex-wrap:nowrap;
          letter-spacing:3px;
          border-radius: 5px;
          text-align: left;
          max-width:320px;
          background:inherit;
        
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 120ms;
      
          &.${selectUnstyledClasses.focusVisible} {
            border-color: white;
            outline: 2px solid white;
          }
        
          &.${selectUnstyledClasses.expanded} {
            &::after {
              content: '▴';
            }
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
            width:200px;
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


  return (
    <>
      <CustomSelect onChange={(_, value) => { switchToLocale(value) }} defaultValue={currentLanguage}>
        {locales.map((locale) => {
          const label = capitalize(languageNames.of(locale) ?? locale);
          const option = {
            value: locale,
            label,
          };

          return <StyledOption key={locale} label={option.label} value={option.value} >{option.label}</StyledOption>;
        })}
      </CustomSelect>
    </>
  )
}

export default SwitchLang