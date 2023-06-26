import React, { useState } from 'react'
import "./index.css"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { auth } from '../../Firebase/base';

import { FirebaseCrud } from '../../Firebase/Cruds';
import MainPageLoader from '../CustomLoader';

export default function Register(props) {
    // loader
    const [regisLoader, setRegisLoader] = useState(false)
    // handle page
    const { handlePageSwitch } = props
    // state for input fields
    const [formModal, setFormModal] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
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
    const handleRegister = async () => {
        setRegisLoader(true)
        const { email, password } = formModal
        auth.createUserWithEmailAndPassword(email, password).then((register) => {
            setRegisLoader(false)
            let id = register.user._delegate.uid
            handlePageSwitch("login")
            FirebaseCrud("Users", "setDoc", { id, ...formModal }, id, "register")
        }).catch((e) => {
            setRegisLoader(false)
            alert(e.message)
        })
    }
    return (
        <div id='LoginComp' >
            <Modal isOpen={true} >
                {regisLoader ? <MainPageLoader /> : null}
                <ModalHeader className='Loginheader text-info'>
                    Register
                </ModalHeader>

                <ModalBody>
                    <div className='mt-2'>
                        {/* Name */}
                        <label for="name">Name</label>
                        <input
                            className='form-control'
                            name="name"
                            type="text"
                            id="name"
                            value={formModal.name}
                            onChange={handleChange}
                        />
                        {/* Email */}
                        <label for="email" className='mt-3'>Email</label>
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
                        {/* Role */}
                        <React.Fragment>
                            <label for="email" className='mt-3'>Select Role</label>
                            <div className="form-check mt-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    id="flexRadioDefault1"
                                    checked={formModal.role === "manager"}
                                    onChange={() => {
                                        setFormModal({
                                            ...formModal,
                                            role: "manager",
                                        })
                                    }}
                                />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Manager
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    id="flexRadioDefault2"
                                    checked={formModal.role === "user"}
                                    onChange={() => {
                                        setFormModal({
                                            ...formModal,
                                            role: "user"
                                        })
                                    }}
                                />
                                <label className="form-check-label" for="flexRadioDefault2">
                                    User
                                </label>
                            </div>
                        </React.Fragment>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-warning"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                    <a
                        href='/'
                        className='text-primary m-2'
                        onClick={(e) => {
                            e.preventDefault()
                            handlePageSwitch("login")
                        }
                        }
                    >
                        Sign in
                    </a>

                </ModalFooter>

            </Modal>
        </div>
    )
}
