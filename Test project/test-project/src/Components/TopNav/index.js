import React from 'react'
import { auth } from '../../Firebase/base'
import { useNavigate } from "react-router-dom";
import './index.css'
export default function TopNav() {
    // get user from local storage
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
    // to redirect the page
    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault()
        navigate("/")
        localStorage.clear();
        auth.signOut()
    }
    // Handle route
    const handleRouteChange = (e, route) => {
        e.preventDefault()
        navigate(route)
    }
    return (
        <div id='TopNav'>
            <nav className="navbar navbar-expand-md bg-light navbar-dark justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a
                            className="nav-link text-dark"
                            href="/"
                            onClick={(e) => handleRouteChange(e, "/home")}
                        >
                            Home
                        </a>
                    </li>
                    {currentUser.role === "manager" ?
                        <li className="nav-item">
                            <a
                                className="nav-link text-dark"
                                href="/"
                                onClick={(e) => handleRouteChange(e, "/users")}
                            >
                                Users
                            </a>
                        </li> : null
                    }

                    <li className="nav-item ">
                        <a className="nav-link text-dark" href="/" onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
