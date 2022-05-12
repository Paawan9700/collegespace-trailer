import React, { useState } from 'react';
import EventContext from './EventContext';

const EventState = (props) => {

  const initialEvents = [
    {
      "_id": "62640de9cf15748e9c1a80fd",
      "title": "gusto night",
      "description": "drama and all",
      "tag": "fun event",
      "Date": "2022-04-23T14:32:09.103Z",
      "__v": 0
    },
    {
      "_id": "62640e4ccf15748e9c1a80ff",
      "title": "dj night",
      "description": "a night full of music and dance",
      "tag": "fun event",
      "Date": "2022-04-23T14:33:48.542Z",
      "__v": 0
    },
    {
      "_id": "62640e6104241723042d0e7e",
      "title": "dj night",
      "description": "a night full of music and dance",
      "tag": "fun event",
      "Date": "2022-04-23T14:34:09.425Z",
      "__v": 0
    },
    {
      "_id": "6264342378249b7cd07e9b5b",
      "title": "gusto night 2",
      "description": "drama and all 2",
      "tag": "fun event 2",
      "Date": "2022-04-23T17:15:15.837Z",
      "__v": 0
    }
  ]

  const [events, setevents] = useState(initialEvents)

  // add event
  const addEvent = (event)=> {
    // TODO -> api call to add event in to the database

    console.log("adding a new event");
    setevents(events.concat(event)) // concat returns an array
  }

  // edit a event  logic to edit any shown event
  const editEvent = ()=> {
    // to do depend ki edit functionality hogi ki nahi
  }

  return (
    // context api basic syntax
    <EventContext.Provider value={{ events, setevents, addEvent, editEvent}}>
      {props.children}
    </EventContext.Provider>
  )

}

export default EventState;