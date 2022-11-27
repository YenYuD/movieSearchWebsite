import React from 'react'
import EventItems from './EventItems';
import { FeaturedEventsModel } from './EventModel';
import classes from './event-list.module.css';

const EventList = (props: any) => {

    const { items } = props;

    return (
        <>
            <ul className={classes.list}>
                {items.map((v: any) => {
                    return <EventItems key={v.id} title={v.title} id={v.id} date={v.date} location={v.location} image={v.image}></EventItems>
                })}
            </ul>
        </>
    )
}

export default EventList