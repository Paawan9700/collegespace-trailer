import React from 'react'

export const EventItem = (props) => {

    const { title, description, tag } = props.event

    return (
            <div className="card col-md-3 my-3">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description} </p>
                        <p className='card-text'>{tag}</p>
                    </div>
            </div>
    )
}
