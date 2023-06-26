import React, { useState } from 'react'
import "./index.css"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { auth } from '../../Firebase/base';
import { useNavigate } from "react-router-dom";
import { FirebaseCrud } from '../../Firebase/Cruds';

import MainPageLoader from '../CustomLoader';

export default function Login(props) {
    // loader
    const [loginLoader, setLoginLoader] = useState(false)
    // to redirect the page
    const navigate = useNavigate()
    // handle page
    const { handlePageSwitch } = props
    // state for input fields
    const [formModal, setFormModal] = useState({
        email: "",
        password: "",

    })
    // to handle the change in field
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormModal({
            ...formModal,
            [name]: value
        })
    }
    // to login the user
    const handleLogin = async () => {
        setLoginLoader(true)
        const { email, password } = formModal
        auth.signInWithEmailAndPassword(email, password).then(async (signIn) => {
            const id = signIn.user._delegate.uid
            const result = await FirebaseCrud("Users", "getDocById", null, id)
            if (result) {
                setLoginLoader(false)
                navigate('/home')
                localStorage.setItem('userInfo', JSON.stringify(result));
            }
        }).catch((e) => {
            setLoginLoader(false)
            alert(e.message)
        })

    }


    return (
        <div id='LoginComp' >
            {loginLoader ? <MainPageLoader /> : null}

            <Modal isOpen={true} >
                <ModalHeader className='Loginheader text-info'>
                    Login
                </ModalHeader>

                <ModalBody>
                    <div className='mt-2'>
                        {/* Email */}
                        <label for="email">Email</label>
                        <input
                            className='form-control'
                            name="email"
                            type="text"
                            id="email"
                            value={formModal.email}
                            onChange={handleChange}
                        />
                        {/* Password */}
                        <label for="email" className='mt-3'>Password</label>
                        <input
                            className='form-control'
                            name="password"
                            type="password"
                            id="password"
                            value={formModal.password}
                            onChange={handleChange}
                        />

                    </div>
                </ModalBody>
                <ModalFooter>

                    <button
                        className='btn btn-primary'
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <a
                        href='/'
                        className='text-primary m-2'
                        onClick={(e) => {
                            e.preventDefault()
                            handlePageSwitch("register")
                        }
                        }
                    >
                        Sign up
                    </a>

                </ModalFooter>

            </Modal>
        </div>
    )
}
