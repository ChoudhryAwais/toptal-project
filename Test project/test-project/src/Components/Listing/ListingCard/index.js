import { Rating } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ListingCard(props) {
    const { data, index, handleSetEditData, handleDelete, handleCancel, handleBookModel, currentUser, userReserveBike } = props

    return (
        <div className="bg-light mt-3" id="ListingComp">
            <div className="row border p-1 productMainCard bg-light">

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="row p-1">
                        <div className="col-lg-10 col-sm-12">
                            <h5 className='productTitle'>{data.model}</h5>
                            <div className="flex-row">
                                <div className="ratings  ">
                                    <Rating name="read-only" value={data.Rating} readOnly />
                                </div>
                            </div>
                            <div className="mb-1 spec-1">
                                <div className='row'>
                                    <div className='col-lg-2 col-sm-2'>
                                        <span className='StatusText'>Available:</span>{' '}
                                    </div>
                                    <div className='col-lg-4 col-sm-10'>
                                        <span className='statusDetail'>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name={'bike' + index}
                                                    id={"flexSwitchCheckChecked" + index}
                                                    checked={data.available === true}
                                                    readOnly
                                                />
                                            </div>
                                        </span>
                                    </div>
                                    <div className='col-lg-1 col-sm-2'>
                                        <span className='detailText'>Color:</span>{' '}
                                    </div>
                                    <div className='col-lg-5 col-sm-10'>
                                        <div className='detail colorDiv' style={{ backgroundColor: data.color }} />
                                    </div>
                                    <div className='col-lg-2 col-sm-2'>
                                        <span className='StatusText'>Location:</span>{' '}
                                    </div>
                                    <div className='col-lg-4 col-sm-10'>
                                        <span className='statusDetail'>
                                            {data.location}
                                        </span>
                                    </div>
                                </div>


                            </div>
                            <div className="spec-1">
                                <div className='row'>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-12 border-left mt-1 textRight">
                            <h4 className="mr-1 productPrice text-center">Posted Date</h4>
                            <h6 className="text-secondary text-center">{data.postedData}</h6>
                        </div>
                        <div
                            className={
                                currentUser.role === "manager" ?
                                    "col-xl-12 text-right " :
                                    "col-xl-12 text-right "
                            }
                        >
                            {currentUser.role === "manager" ?
                                <div className='listinOption'>
                                    <div className="dropdown">
                                        <button className="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <MoreVertIcon />
                                        </button>
                                        <ul className="dropdown-menu" >
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="/"
                                                    onClick={(e) => {
                                                        handleSetEditData(e, data, index)
                                                    }}
                                                >
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item text-danger"
                                                    href="/"
                                                    onClick={(e) => {
                                                        handleDelete(e, index, data.id)
                                                    }}
                                                >
                                                    Delete
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div> : null
                            }

                            {data.BookBy !== "" ?
                                <div className='bookButton'>
                                    {currentUser.role === "manager" ? null :
                                        <button
                                            className='btn btn btn-danger '
                                            onClick={() => {
                                                handleCancel(true, data)
                                            }}
                                        >
                                            Canel Booking
                                        </button>
                                    }
                                </div>
                                :
                                <div className='bookButton'>
                                    {currentUser.role === "manager" ?
                                        null :
                                        <button
                                            className='btn btn btn-success '
                                            onClick={() => {
                                                handleBookModel(data, index)

                                            }}
                                        >
                                            Book
                                        </button>
                                    }

                                </div>
                            }


                        </div>
                        {currentUser.role === "manager" && userReserveBike.length > 0 ?
                            <>
                                <div className='col-lg-12'>
                                    <table className="table table-sm table-bordered table-light">
                                        <thead>
                                            <tr>
                                                <th scope="col">Reserve by</th>
                                                <th scope="col">Period</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{((userReserveBike || "")[0] || {}).email}</td>
                                                <td>{(data || {}).BookFrom} to {(data || {}).Bookto}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                            null
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}
