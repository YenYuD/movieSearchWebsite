import Link from 'next/link'
import React from 'react'
import classes from './button.module.css';

const button = (props: any) => {
  return (
    <Link className={classes.btn} href={props.link}>{props.children}</Link>
  )
}

export default button