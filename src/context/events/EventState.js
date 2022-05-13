import React, { useState } from 'react';
import EventContext from './EventContext';

const EventState = (props) => {

  const initialEvents = []
  const [events, setevents] = useState(initialEvents)

  // to be changed later............................
  const host = "http://localhost:5000";
  //................................................

  // fetching events from the backend \\ API call \\ /api/event/fetchevents
  const getevents = async () => {
    const response = await fetch(`${host}/api/event/fetchevents`, {
      method: 'GET',
      headers: {
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1NTg5ZWJmY2ViNjViZTRlYzVkZDBlIn0sImlhdCI6MTY1MDYzMTYyNX0.LTYYU6RYQA6BHk_mTmHwwMOnNwYXTn-eZp5vvPPSjzY"
      },
    });

    const alreadyPresentEvents = await response.json();
    setevents(alreadyPresentEvents);
  }

  // add events in the database to permanently saved it
  const addEvent = async (newEvent) => {

    const response = await fetch(`${host}/api/event/addevent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1NTg5ZWJmY2ViNjViZTRlYzVkZDBlIn0sImlhdCI6MTY1MDYzMTYyNX0.LTYYU6RYQA6BHk_mTmHwwMOnNwYXTn-eZp5vvPPSjzY"
      },
      body: JSON.stringify(newEvent) 
    }); 

    const addedEvent = await response.json();

    console.log("adding a new event");
    setevents(events.concat(addedEvent)) // concat returns an array
  }

  // edit a event  logic to edit any shown event
  const editEvent = async (id, title, description, tag) => {

    // making sure that all changes should also reflect in the backend also
    const response = await fetch(`${host}/api/event/updatevent/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      // this basiclly means {title : title, description : description, tag : tag}
      body: JSON.stringify({ title, description, tag })
    });

    const editEvent = await response.json();
    console.log(editEvent);
    // in react you update directly, you have to make a copy 
    const newEvents = JSON.parse(JSON.stringify(events))

    // logic to edit the notes of a particular user at the client side is here:
    // basically as soon as i got the id of the particlar note which the user wanna update
    // then corressponding to that id all (title, description, tag) are changed.
    for (let index = 0; index < newEvents.length; index++) {
      if (newEvents[index]._id === id) {
        newEvents[index].title = title;
        newEvents[index].description = description;
        newEvents[index].tag = tag
        break;
      }
    }

    setevents(newEvents);

  }

  return (
    // context api basic syntax
    <EventContext.Provider value={{ events, setevents, addEvent, editEvent, getevents }}>
      {props.children}
    </EventContext.Provider>
  )

}

export default EventState;