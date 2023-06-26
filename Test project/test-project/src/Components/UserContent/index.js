import React, { useEffect, useState } from 'react'
import { FirebaseCrud } from '../../Firebase/Cruds'
import AddUsers from '../AddUsers'
import MainPageLoader from '../CustomLoader'
import UserTable from '../Table'
export default function UserContent() {
    // Loader 
    const [userLoader, setUserLoader] = useState(true)
    // User edit data
    const [userEditData, setUserEditData] = useState({
        data: "",
        index: null
    })
    // bikes data
    const [BikesData, setBikesData] = useState([])
    // users data
    const [userData, setuserData] = useState([])
    // get user from local storage
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
    // Get all the users and bikes
    useEffect(() => {
        const getAllUsers = async () => {
            FirebaseCrud("Users", "getDocAll").then(async (res) => {
                const BikesData = await FirebaseCrud("Bikes", "getDocAll")
                const allOtherUsers = res.filter(item => item.id !== currentUser.id)
                setuserData(allOtherUsers)
                setBikesData(BikesData)
                setUserLoader(false)
            }).catch(() => {
                setUserLoader(false)
            })

        }
        getAllUsers()
    }, [])
    // Update the user in local state
    const updateCallback = async (newObj) => {
        setuserData([newObj, ...userData])
    }
    // Delete user from state
    const handleDelete = (itemsToDel) => {
        const StateData = [...userData]
        const indexOf = StateData.indexOf(itemsToDel)
        StateData.splice(indexOf, 1)
        setuserData(StateData)
    }
    // update user from state
    const handleUpdate = (itemsToUpdate) => {
        const StateData = [...userData]
        StateData[userEditData.index] = itemsToUpdate
        setuserData(StateData)
    }

    return (
        <div>
            {userLoader ? <MainPageLoader /> : null}
            <div className='textRight'>
                <AddUsers
                    updateCallback={updateCallback}
                    editData={userEditData}
                    closeEdit={() => {
                        setUserEditData({
                            data: "",
                            index: null
                        })
                    }}
                    handleUpdate={handleUpdate}
                />
            </div>
            <UserTable
                userData={userData}
                BikesData={BikesData}
                refreshData={handleDelete}
                setUserEdit={(item, index) => {
                    setUserEditData({
                        data: item,
                        index: index
                    })
                }}
                currentUser={currentUser}
            />
        </div>
    )


}
