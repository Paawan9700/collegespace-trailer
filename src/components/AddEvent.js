import React, { useContext, useState } from 'react'
import EventContext from '../context/events/EventContext'

const AddEvent = () => {
    const context = useContext(EventContext);
    const { addEvent } = context;

    const [event, setevent] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addEvent(event);

        setevent({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        // spread operator (this -> ...)
        setevent({ ...event, [e.target.name]: [e.target.value] })
    }

    return (
        <div className='my-10'>
            <h1>Add New Events</h1>

            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Event</button>
            </form>
        </div >
    )
}

export default AddEvent