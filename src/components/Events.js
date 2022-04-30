import React, { useContext } from 'react'
import EventContext from '../context/events/EventContext'
import { EventItem } from './EventItem';

export const Events = () => {
    const context = useContext(EventContext);
    const { events, setevents } = context;

    return (
        <div className="row my-3">
            <h1>All Events</h1>
            {events.map((event) => {
                return <EventItem event = {event}/>;
            })}
        </div>
    )
}
