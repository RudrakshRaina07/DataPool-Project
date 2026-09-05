import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const userId = localStorage.getItem("userId")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/allUsers`)

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
            <div className='bg-[#090040] h-screen text-white flex flex-col items-center'>
                <Navbar />
                <h1 className='mt-10'>Loading....</h1>
            </div>
        )
    }

  return (
        <div className='bg-[#090040] min-h-screen text-white flex flex-col items-center overflow'>
            <Navbar />
            <div className='bg-[#471396] min-h-screen w-[95%] rounded-xl m-4 p-5 overflow'>
                <div className="py-4">
                    <h1 className="text-xl font-bold">Users</h1>
                </div>
                <div>
                    {users.filter((user) => user._id !== userId)
                        .map((user) => (
                            <div key={user._id} className="flex justify-between items-center border rounded-2xl p-5">
                                <div className="flex gap-10">
                                    <h2 className="font-bold text-lg capitalize">{user.username}</h2>
                                    <p className="text-gray-400">Email: {user.email}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            navigate(`/profile/${user._id}`)
                                        }} 
                                        className="px-6 py-3 bg-green-600 rounded-full cursor-pointer active:scale-95 text-black font-medium hover:bg-green-700 ">
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
