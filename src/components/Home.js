import React, {useContext} from 'react'
import { Events } from './Events'


export const Home = () => {
 
    return (
        <div>
            <div className="container">
                <h1>Add New Events</h1>

                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Event</button>
                </form>
            </div>

            <Events />
        </div>
    )
}
