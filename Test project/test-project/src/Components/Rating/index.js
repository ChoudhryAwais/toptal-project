import { Rating } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';


export default function RatingComp(props) {
    const { isOpen, closeModel, handleCancelBooking } = props
    // to handle the model visibility
    const [modal, setModal] = useState(false)
    // 
    const [rating, setRating] = useState(0)

    const handleRating = (e) => {
        setRating(e.target.value)
    }
    // open the close the model
    const toggle = () => {
        setModal(!modal)
        closeModel(!modal)
        setRating(0)
    }
    // Use to check the prop value
    useEffect(() => {
        setModal(isOpen)
    }, [isOpen])
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} position="center">
                <ModalBody>
                    <div className='mt-2 textCenter'>
                        <h5>Please Rate the bike</h5>
                        <Rating value={rating} onChange={handleRating} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={() => {
                        handleCancelBooking(rating)
                        toggle()
                    }}>Rate it</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
