import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import BackButton from '../backButton';
import API_URL from '../../api';

const User = () => {
    const userId = localStorage.getItem("userId")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/allUsers`)

                setUsers(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching users: ", error)
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if(loading){
        return (
            <div className='bg-[#090040] min-h-screen text-white flex flex-col items-center'>
                <Navbar />
                <h1 className='mt-10'>Loading....</h1>
            </div>
        )
    }

  return (
        <div className='bg-[#090040] min-h-screen text-white flex flex-col items-center'>
            <Navbar />
            <div className='bg-[#471396] min-h-screen w-[95%] sm:w-[92%] lg:w-[95%] rounded-xl m-4 p-5 overflow-hidden'>
            <BackButton />
                <div className="py-4">
                    <h1 className="text-xl font-bold">Users</h1>
                </div>
                <div className="flex flex-col gap-4">
                    {users.filter((user) => user._id !== userId)
                        .map((user) => (
                            <div key={user._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border rounded-2xl p-5 transition-all duration-200 hover:border-[#B13BFF] hover:shadow-lg">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10 min-w-0">
                                    <h2 className="font-bold text-lg capitalize wrap-break-word">{user.username}</h2>
                                    <p className="text-gray-400 break-all text-sm sm:text-base">Email: {user.email}</p>
                                </div>
                                <div className="w-full sm:w-auto">
                                    <button
                                        onClick={() => {
                                            navigate(`/profile/${user._id}`)
                                        }} 
                                        className="px-6 py-3 w-full sm:w-auto bg-green-600 rounded-full cursor-pointer active:scale-95 text-black font-medium hover:bg-green-700 transition-all">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))    
                    }
                </div>
            </div>
        </div>
  )
}

export default User
