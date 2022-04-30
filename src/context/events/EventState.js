import React from 'react';
import EventContext from './EventContext';

const EventState = (props) => {

    return (
        // context api basic syntax
        <EventContext.Provider value={{}}>
            {props.children}
        </EventContext.Provider>
    )

}

export default EventState;