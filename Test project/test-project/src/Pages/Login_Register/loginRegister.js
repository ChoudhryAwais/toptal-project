import React, { useState } from 'react'
import Login from '../../Components/Login'
import Register from '../../Components/Register'

export default function LoginRegister() {
    const [pageSwitch, setpageSwitch] = useState("login")
    // handle page switch
    const handlePageSwitch = (name) => {
        setpageSwitch(name)
    }
    return (
        <div>
            {pageSwitch === "login" ?
                <Login handlePageSwitch={handlePageSwitch} />
                :
                <Register handlePageSwitch={handlePageSwitch} />
            }
        </div>
    )
}
