import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { EventProps } from './EventModel'
import classes from './event-items.module.css';

const EventItems = (props: EventProps) => {

    const { id, title, image, date, location } = props;

    const readableDate = new Date(date).toLocaleDateString('zh-TW', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formattedAddress = location.replace(', ', '\n');

    const exploreLink = `/events/${id}`;

    return (
        <>
            <li className={classes.item}>
                <Image src={'/' + image} alt={title} width={500} height={500} />
                <div className={classes.content}>
                    <div className={classes.summary}>
                        <h2>{title}</h2>
                        <div className={classes.date}>
                            <time>{readableDate}</time>
                        </div>
                        <div className={classes.address}>
                            <address>{formattedAddress}</address>
                        </div>
                    </div>
                    <div className={classes.actions}>
                        <Link href={exploreLink}>Explore Event</Link>
                    </div>
                </div>
            </li>
        </>
    )
}

export default EventItems