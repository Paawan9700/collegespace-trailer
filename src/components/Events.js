import React, { useContext, useEffect } from 'react'
import EventContext from '../context/events/EventContext'
import AddEvent from './AddEvent';
import { EventItem } from './EventItem';

export const Events = () => {
    const context = useContext(EventContext);
    const { events, getevents } = context;

    useEffect(() => {
        getevents();
    }, [])


    return (
        <>
            <div className="row my-3">
                <h1>College Events</h1>
                {events.map((event) => {
                    return <EventItem key={event._id} event={event} />;
                })}
            </div>
            <AddEvent />
        </>
    )
}
