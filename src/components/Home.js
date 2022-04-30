import React, {useContext} from 'react'
import EventContext from '../context/events/EventContext'

export const Home = () => {
    const context = useContext(EventContext);

    const {events, setevents} = context;
    return (
        <div>
            <div className="container">
                <h1>Add New Events</h1>

                <form className='my-3'>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Title</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Event</button>
                </form>
            </div>

            <div className="container my-3">
                <h1>All Events</h1>
                {events.map((event) => {
                    return event.title;
                })}
            </div>
        </div>
    )
}
