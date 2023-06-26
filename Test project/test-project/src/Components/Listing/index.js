import React, { useState, useEffect } from 'react'
import './index.css'
import AddBike from '../AddBikesModel';
import { FirebaseCrud } from '../../Firebase/Cruds';
import BookModel from '../BookModel';
import RatingComp from '../Rating';
import Filter from '../Filter';
import ListingCard from './ListingCard';
import MainPageLoader from '../CustomLoader';
import NoRecord from '../NoRecord';

export default function Listing() {
    // Loader 
    const [ListingLoader, setListingLoader] = useState(true)
    // get user from local storage
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
    // rating model
    const [ratingModelData, setRatingModelData] = useState({})
    // rating model
    const [ratingModel, setRatingModel] = useState(false)
    // reserve Page
    const [reservePage, setReservePage] = useState(false)
    // filter bike
    const [FilterBikes, setFilterBikes] = useState([])
    // state for bikes data
    const [bikesData, setBikesData] = useState([])
    // state for all users data
    const [allUsers, setAllUsers] = useState([])
    // state for bikes data
    const [bookEditData, setBookEditData] = useState({
        index: null,
        data: {}
    })
    // For option dropdwon
    const [editData, setEditData] = useState({
        index: null,
        data: {}
    })
    // For edit modal for bikes
    const [editModal, setEditModal] = useState(false)
    // handle model for booked
    const [bookedModelOpen, seBookedModelOpen] = useState(false)
    // Get data from firebase database 
    useEffect(() => {
        getBikes()
    }, [])

    // Get the data
    const getBikes = async () => {
        FirebaseCrud("Bikes", "getDocAll").then(async (allBikes) => {
            if (currentUser.role === "manager") {
                const allUsers = await FirebaseCrud("Users", "getDocAll")
                if (allUsers) {
                    setAllUsers(allUsers)
                }
            }
            const filterBikes = allBikes.filter(e => e.BookBy === "")
            setBikesData(allBikes)
            setFilterBikes(filterBikes)
            setListingLoader(false)
        }).catch(() => {
            setListingLoader(false)
        })

    }
    // Handle booked model
    const handleBookModel = (items, index) => {
        seBookedModelOpen(!bookedModelOpen)
        if (items) {
            setBookEditData({
                index: index,
                data: items
            })
        } else {
            setBookEditData({
                index: null,
                data: {}
            })
        }

    }
    // set the edit data for model
    const handleSetEditData = (e, items, index) => {
        e.preventDefault()
        setEditData({
            ...editData,
            data: items,
            index
        })
        setEditModal(true)
    }
    // Edit the data for bikes
    const handleEditBikes = (item) => {
        debugger
        const bikeState = [...bikesData]
        bikeState[editData.index] = item
        setBikesData(bikeState)
        setFilterBikes(bikeState)
        setEditData({
            index: null,
            data: {}
        })
    }
    // handle delete listing
    const handleDelete = (e, index, id) => {
        e.preventDefault()
        let bikeState = [...bikesData]
        FirebaseCrud("Bikes", "deleteDoc", null, id)
        bikeState.splice(index, 1);
        setBikesData(bikeState)
        setFilterBikes(bikeState)
    }

    // realtime check for bikes add
    const updateCallBack = (newData) => {
        setBikesData([newData, ...bikesData])
        setFilterBikes([newData, ...bikesData])
    }
    // book realtime check
    const updateCallBackFromBook = (item, bookData) => {
        let bikeState = [...bikesData]
        let indexOfBike = bikeState.indexOf(bookData)
        bikeState[indexOfBike] = item
        setBikesData(bikeState)
    }
    // Filter by reserve bike or all
    const reserveBike = (condition) => {
        if (condition) {
            const stateBike = [...bikesData]
            if (currentUser.role === "manager") {
                const filterBikes = stateBike.filter(e => e.BookBy !== "")
                setFilterBikes(filterBikes)
            } else {
                const filterBikes = stateBike.filter(e => e.BookBy === currentUser.id)
                setFilterBikes(filterBikes)
            }
        } else {
            const stateBike = [...bikesData]
            const filterBikes = stateBike.filter(e => e.BookBy === "")
            setFilterBikes(filterBikes)
        }
        setReservePage(condition)
    }
    // use to handle cancel booking
    const handleCancelBooking = (rating) => {
        let filterData = [...bikesData]
        let indexof = filterData.indexOf(ratingModelData)
        let bikeRating = calcRating((ratingModelData.Rating || 0), rating)
        let updateData = { ...ratingModelData }
        updateData.BookBy = ""
        updateData.Bookto = ""
        updateData.BookFrom = ""
        updateData.available = true
        updateData.Rating = bikeRating
        delete updateData.id
        FirebaseCrud("Bikes", "updateDoc", updateData, ratingModelData.id)
        filterData[indexof] = { id: ratingModelData.id, ...updateData }
        setBikesData(filterData)
    }
    // Rating calculation
    const calcRating = (preRating, rating) => {
        let newRating = (parseInt(preRating) + parseInt(rating)) / 2
        return newRating > 5 ? 5 : newRating
    }
    // handle filter model
    const handleFilterModel = (filterModel) => {
        const data = [...FilterBikes]
        const filteredData = data.filter(e =>
            e.model.includes(filterModel.model) &&
            e.color.includes(filterModel.color) &&
            e.location.includes(filterModel.location) &&
            (e.Rating >= filterModel.ratingAvg)
        )
        setFilterBikes(filteredData)
    }
    // handle clear filter
    const handleClearFilter = () => {
        reserveBike(reservePage)
    }
    // reserve the bike
    useEffect(() => {
        reserveBike(reservePage)
    }, [bikesData])


    return (
        <React.Fragment>
            {ListingLoader ? <MainPageLoader /> : null}
            <div className='row filterSide'>
                <div className='col-md-3'>
                    <Filter
                        dataTobeFilter={bikesData}
                        filterModel={handleFilterModel}
                        clearFilter={handleClearFilter}
                        pageChange={reservePage}
                    />
                </div>
                <div className='col-md-9'>
                    <BookModel
                        isOpen={bookedModelOpen}
                        handleBookModel={handleBookModel}
                        bookEditData={bookEditData}
                        updateCallBackFromBook={updateCallBackFromBook}
                    />
                    <RatingComp
                        isOpen={ratingModel}
                        closeModel={() => {
                            setRatingModel(false)
                        }}
                        handleCancelBooking={handleCancelBooking}
                    />
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='textLeft '>
                                <button className={reservePage ? 'btn btn-outline-info' : "btn btn-info"} onClick={() => reserveBike(false)}>All Bikes</button>{" "}
                                <button
                                    className={reservePage ? 'btn btn-info' : "btn btn-outline-info"}
                                    onClick={() => reserveBike(true)}
                                >
                                    {
                                        currentUser.role === "manager" ?
                                            "Reserved Bikes" :
                                            "My Reserved bikes"
                                    }

                                </button>

                            </div>
                        </div>
                        {currentUser.role === "manager" ?
                            <div className='col-md-6'>
                                <div className='textRight'>
                                    <AddBike
                                        isOpen={editModal}
                                        closeEdit={() => {
                                            setEditModal(false)
                                            setEditData({
                                                index: null,
                                                data: {}
                                            })
                                        }}
                                        editData={(editData || {}).data}
                                        handleEditBikes={handleEditBikes}
                                        updateCallBack={updateCallBack}
                                    />
                                </div>
                            </div>
                            : null
                        }
                    </div>

                    {FilterBikes.length > 0 ?
                        (FilterBikes || []).map((items, i) => {
                            const userReserveBike = allUsers.filter(user => user.id === items.BookBy)
                            return (
                                <React.Fragment key={i}>
                                    <ListingCard
                                        userReserveBike={userReserveBike}
                                        currentUser={currentUser}
                                        data={items}
                                        index={i}
                                        handleSetEditData={handleSetEditData}
                                        handleDelete={handleDelete}
                                        handleCancel={(bool, data) => {
                                            setRatingModel(bool)
                                            setRatingModelData(data)
                                        }
                                        }
                                        handleBookModel={handleBookModel}
                                    />
                                </React.Fragment>
                            )
                        }
                        )
                        :
                        <div className="mx-auto mt-4" style={{ width: "200px" }}>
                            <NoRecord />
                        </div>
                    }
                </div>
            </div>
        </React.Fragment >
    )


}
