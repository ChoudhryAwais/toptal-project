import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { auth } from '../../Firebase/base';
import { FirebaseCrud } from '../../Firebase/Cruds';
import MainPageLoader from '../CustomLoader';

export default function AddUsers(props) {
    const { updateCallback, editData, closeEdit, handleUpdate } = props
    // loader
    const [regisLoader, setRegisLoader] = useState(false)
    // get user from local storage
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
    // to handle the model visibility
    const [modal, setModal] = useState(false)
    // open the close the model
    const toggle = () => {
        setModal(!modal)
        setFormModal({
            email: "",
            password: "",
            role: "user",
            name: ""
        })
        closeEdit()
    }
    // state for input fields
    const [formModal, setFormModal] = useState({
        email: "",
        password: "",
        role: "user",
        name: ""
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
        auth.createUserWithEmailAndPassword(email, password).then(async (register) => {
            let id = register.user._delegate.uid
            const email = currentUser.email
            const password = currentUser.password
            const reLogin = await auth.signInWithEmailAndPassword(email, password)
            if (reLogin.user) {
                setRegisLoader(false)
                FirebaseCrud("Users", "setDoc", { id, ...formModal }, id,)
                updateCallback({ id, ...formModal })
                toggle()
            }
        }).catch((e) => {
            setRegisLoader(false)
            alert(e.message)
        })
    }
    // Edit data in database
    const handleEditReg = () => {
        FirebaseCrud("Users", "updateDoc", formModal, editData.data.id)
        handleUpdate(formModal)
        toggle()
    }
    // Check for edit data
    useEffect(() => {
        if (editData.data) {
            setModal(!modal)
            setFormModal(editData.data)
        }
    }, [editData])
    return (
        <div>
            {regisLoader ? <MainPageLoader /> : null}
            <button className='btn btn-warning' onClick={toggle}>Add New User</button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{editData.data ? "Edit" : "Add"} User</ModalHeader>
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
                            disabled={editData.data ? true : false}
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
                            disabled={editData.data ? true : false}
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
                    {editData.data ?
                        <button
                            className="btn btn-warning"
                            onClick={handleEditReg}
                        >
                            Edit
                        </button>
                        :
                        <button
                            className="btn btn-warning"
                            onClick={handleRegister}
                        >
                            Add
                        </button>
                    }



                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
