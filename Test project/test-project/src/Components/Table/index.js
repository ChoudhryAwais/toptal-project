import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FirebaseCrud } from '../../Firebase/Cruds';
import NoRecord from '../NoRecord';

export default function UserTable(props) {
    const { userData, BikesData, refreshData, setUserEdit } = props
    // Delete the user
    const hanldeDeleteUser = async (item) => {
        const BikesAllData = [...BikesData]
        let bikesHaveUser = (BikesAllData.filter(e => e.BookBy === item.id) || "")[0]
        let updateId = bikesHaveUser.id
        bikesHaveUser.BookBy = ""
        bikesHaveUser.BookFrom = ""
        bikesHaveUser.Bookto = ""
        bikesHaveUser.available = true
        delete bikesHaveUser.id
        FirebaseCrud("Bikes", "updateDoc", bikesHaveUser, updateId)
        FirebaseCrud("Users", "deleteDoc", null, item.id)
        refreshData(item)
    }
    return (
        <div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Bikes Reserved</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.length > 0 ?
                        userData.map((items, i) => {
                            const bikesReserved = BikesData.filter(bikes => bikes.BookBy === items.id)
                            return (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>{items.name}</td>
                                        <td>{items.email}</td>
                                        <td>{(items.role || "").toUpperCase()}</td>
                                        {bikesReserved.length > 0 ?
                                            <td className='text-success'>
                                                <div className="dropdown">
                                                    <button className="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        See Reserved
                                                    </button>
                                                    <ul className="dropdown-menu" >
                                                        <table className="table table-sm table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Model</th>
                                                                    <th scope="col">Period</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {bikesReserved.map((bikes, i) =>

                                                                    <tr key={i}>
                                                                        <td>{bikes.model}</td>
                                                                        <td>{bikes.BookFrom} to {bikes.Bookto}</td>
                                                                    </tr>

                                                                )}
                                                            </tbody>
                                                        </table>

                                                    </ul>
                                                </div>

                                            </td>
                                            :
                                            <td className='text-danger'>
                                                No Reserved Bike
                                            </td>

                                        }

                                        <td>
                                            <EditIcon
                                                className='text-primary cursorPointer'
                                                onClick={() => setUserEdit(items, i)}
                                            />
                                            <DeleteIcon
                                                className='text-danger cursorPointer'
                                                onClick={() => hanldeDeleteUser(items)}
                                            />
                                        </td>

                                    </tr>
                                </React.Fragment>
                            )
                        }) : <NoRecord />
                    }

                </tbody>
            </table>
        </div>
    )
}
