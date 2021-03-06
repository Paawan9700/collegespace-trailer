import React from 'react'
import { Link, useLocation } from 'react-router-dom'


export const Navbar = () => {
    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">College Space</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                More
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/previousyearpapers">Previous Years Papers</Link></li>
                                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/discussionforum">Discussion Forum</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <Link className="btn btn-outline-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-primary mx-2" to="/signup" role="button">SignUp</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}
