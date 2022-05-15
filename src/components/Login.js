import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });

    let navigate = useNavigate();
    const onChange = (e) => {
        // spread operator (this -> ...)
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        // to save your page from reload we use-
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json)

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
        } else {
            alert("Invalid creadentials");
        }
    }

    return (
        <div>
        <h1>WelCome Back!!</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" />
                </div>
                <button type="submit" className="btn btn-outline-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login