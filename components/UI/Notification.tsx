import React from 'react'
import { Grid } from '@mui/material'

const Notification = (props: any) => {
    return (
        <Grid>
            <div>{props.title}</div>
            <div>{props.message}</div>
        </Grid>)

}

export default Notification