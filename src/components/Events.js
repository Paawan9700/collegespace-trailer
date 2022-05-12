import React, { useContext } from 'react'
import EventContext from '../context/events/EventContext'
import AddEvent from './AddEvent';
import { EventItem } from './EventItem';

export const Events = () => {
    const context = useContext(EventContext);
    const { events } = context;

    return (
        <>
            <AddEvent />
            <div className="row my-3">
                <h1>All Events</h1>
                {events.map((event) => {
                    console.log(event._id);
                    return <EventItem key = {event._id} event={event} />;
                })}
            </div>
        </>
    )
}
