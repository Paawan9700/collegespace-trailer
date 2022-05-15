import React, { useContext, useEffect, useRef, useState} from 'react'
import EventContext from '../context/events/EventContext'
import AddEvent from './AddEvent';
import { EventItem } from './EventItem';

export const Events = () => {
    const context = useContext(EventContext);
    const { events, getevents , editEvent} = context;

    const ref = useRef(null);
    useEffect(() => {
        getevents();
        // eslint-disable-next-line
    }, [])

    const [event, setevent] = useState({ title: "", description: "", tag: "" })
    const updateEvent = (currentEvent) => {
        ref.current.click();
        setevent(currentEvent);
    }

    const handleClick = (e) => {
        e.preventDefault();
        // editEvent({})
    }

    const onChange = (e) => {
        // spread operator (this -> ...)
        setevent({ ...event, [e.target.name]: [e.target.value] })
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value = {event.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value = {event.description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value = {event.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Event</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>College Events</h1>
                {events.map((event) => {
                    return <EventItem key={event._id} updateEvent={updateEvent} event={event} />;
                })}
            </div>
            <AddEvent />
        </>
    )
}
