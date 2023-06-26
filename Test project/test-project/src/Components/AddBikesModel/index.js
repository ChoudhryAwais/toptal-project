import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FirebaseCrud } from '../../Firebase/Cruds';
import MainPageLoader from '../CustomLoader';
export default function AddBike(props) {
    // loader
    const [loader, setLoader] = useState(false)
    // props from listing
    const { isOpen, closeEdit, editData, updateCallBack, handleEditBikes } = props
    // to handle the model visibility
    const [modal, setModal] = useState(false)
    // open the close the model
    const toggle = () => {
        setModal(!modal)
        closeEdit(!modal)
        setBikesFormModal({
            ...bikesFormModal,
            color: "#000000",
            location: "",
            Rating: 0,
            available: true,
            model: "",
            BookBy: "",
            postedData: "",
            Bookto: "",
            BookFrom: "",

        })
    }
    // Use to check the prop value
    useEffect(() => {
        setModal(isOpen)
        if (editData) {
            setBikesFormModal(editData)
        }

    }, [isOpen])
    // state for input fields
    const [bikesFormModal, setBikesFormModal] = useState({
        color: "#000000",
        location: "",
        Rating: 0,
        available: true,
        model: "",
        BookBy: "",
        postedData: "",
        Bookto: "",
        BookFrom: "",

    })
    // to handle the change in field
    const handleChange = (e) => {
        const { name, value } = e.target
        setBikesFormModal({
            ...bikesFormModal,
            [name]: value
        })
    }
    // Add bike
    const handleAdd = async () => {
        setLoader(true)
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let formState = { ...bikesFormModal }
        formState.postedData = date
        FirebaseCrud("Bikes", "addDoc", formState).then((id) => {
            setLoader(false)
            updateCallBack({ id, ...formState })
            toggle()
        }).catch((e) => {
            alert(e.message)
            setLoader(false)
        })

    }
    // Edit the bikes
    const handleEdit = () => {
        debugger
        let editId = bikesFormModal.id
        let editPayload = { ...bikesFormModal }
        delete editPayload.id
        FirebaseCrud("Bikes", "updateDoc", editPayload, editId)
        handleEditBikes(bikesFormModal)
    }
    return (
        <div>
            {loader ? <MainPageLoader /> : null}
            <button className='btn btn-warning' onClick={toggle}>Add Bike</button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add Bike</ModalHeader>
                <ModalBody>
                    <div className='mt-2 row'>
                        <div className='col-md-6'>
                            {/* model */}
                            <label for="model">Model</label>
                            <input
                                className='form-control'
                                name="model"
                                type="text"
                                id="model"
                                value={bikesFormModal.model}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-md-6 '>

                            {/* Color */}
                            <label for="color">Color</label>
                            <input
                                className='form-control'
                                name="color"
                                type="color"
                                id="password"
                                value={bikesFormModal.color}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-md-12'>

                            {/* Location */}
                            <label for="location">Location</label>
                            <input
                                className='form-control'
                                name="location"
                                type="text"
                                id="location"
                                value={bikesFormModal.location}
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    {editData
                        && editData.model
                        ?
                        <Button
                            color="primary"
                            onClick={() => {
                                handleEdit(bikesFormModal)
                                toggle()
                            }}
                        >
                            Edit
                        </Button>
                        :
                        <Button color="primary" onClick={handleAdd}>Add</Button>
                    }

                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
