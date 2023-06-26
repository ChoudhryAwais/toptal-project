import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FirebaseCrud } from '../../Firebase/Cruds';

export default function BookModel(props) {

    const { isOpen, handleBookModel, bookEditData, updateCallBackFromBook } = props
    // get user from local storage
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
    // to handle the model visibility
    const [modal, setModal] = useState(false)
    // open the close the model
    const toggle = () => {
        setModal(!modal)
        handleBookModel()
        setBookModel({
            ...bookModel,
            bookFrom: "",
            bookto: "",

        })
    }
    // state for input fields
    const [bookModel, setBookModel] = useState({
        bookFrom: "",
        bookto: "",
    })
    // to handle the change in field
    const handleChange = (e) => {
        const { name, value } = e.target
        setBookModel({
            ...bookModel,
            [name]: value
        })
    }
    // book the bike 
    const handleBooked = () => {
        console.log("Book clicked")
        if (bookModel.bookFrom !== "" && bookModel.bookto !== "") {
            let dataObj = { ...bookEditData.data }
            const bookedDataId = bookEditData.data.id
            dataObj.BookBy = currentUser.id
            dataObj.BookFrom = bookModel.bookFrom
            dataObj.Bookto = bookModel.bookto
            dataObj.available = false
            delete dataObj.id
            FirebaseCrud("Bikes", "updateDoc", dataObj, bookedDataId)
            let mergewithId = { id: bookedDataId, ...dataObj }
            updateCallBackFromBook(mergewithId, bookEditData.data)
            toggle()
        }
    }

    // Use to check the prop value
    useEffect(() => {
        setModal(isOpen)
    }, [isOpen])
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Book {bookEditData.data.model}</ModalHeader>
                <ModalBody>
                    <div className='mt-2 row'>
                        <div className='col-md-6'>
                            {/* Book from */}
                            <label for="bookFrom">Book from</label>
                            <input
                                className='form-control'
                                name="bookFrom"
                                type="date"
                                id="model"
                                value={bookModel.bookFrom}
                                onChange={handleChange}
                                max={bookModel.bookto}
                            />
                        </div>
                        <div className='col-md-6'>
                            {/* Book to */}
                            <label for="bookto">Book to</label>
                            <input
                                className='form-control'
                                name="bookto"
                                type="date"
                                id="model"
                                value={bookModel.bookto}
                                onChange={handleChange}
                                min={bookModel.bookFrom}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleBooked}>Book</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
