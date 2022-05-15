import React from 'react'

export const EventItem = (props) => {

    const { title, description, tag } = props.event
    const { updateEvent, event} = props;

    const handleUpdateEvent = () => {
        updateEvent(event);
    }

    return (
        <div>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description} </p>
                    <p className='card-text'>{tag}</p>
                    <i className='fas fa-solid fa-edit' onClick={handleUpdateEvent}></i>
                </div>
            </div>
        </div>
    )
}
