import React from 'react'
import TopNav from '../../Components/TopNav'
import UserContent from '../../Components/UserContent'


export default function Users() {
    return (
        <div>
            <TopNav />
            <div className='mt-3 container'>
                <UserContent />
            </div>
        </div>
    )
}
