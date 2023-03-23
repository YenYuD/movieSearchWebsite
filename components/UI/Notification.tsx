import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { NotificationStatusType } from '../../store/notification-context';
import { createPortal } from 'react-dom';

const Notification = (props: any) => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => setMounted(false)
    }, [])

    const { status, title, message } = props;

    let bgColor;

    if (status === NotificationStatusType.error) {
        bgColor = 'bg-rose-200'
    } else if (status === NotificationStatusType.pending) {
        bgColor = 'bg-orange-200'
    } else if (status === NotificationStatusType.success) {
        bgColor = ' bg-green-100'
    }


    return mounted ? createPortal((<Grid className={` py-6 px-6 z-10 text-black absolute bottom-8 text-center ${bgColor} w-1/2 rounded-xl ${title ? 'animate-snackbar ' : ''}`}>
        <Typography py={1}>{title}</Typography>
        <Typography py={1}>{message}</Typography>
    </Grid>
    ), document.querySelector('#notification') as HTMLElement) : null


}

export default Notification