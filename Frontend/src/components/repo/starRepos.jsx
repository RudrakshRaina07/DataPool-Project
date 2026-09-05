import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const starRepos = () => {
    const [starredRepos, setStarredRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchStarRepository = async () => {
            const userId = localStorage.getItem("userId")
            if(!userId){
                setLoading(false)
                return;
            }
            try {
                const response =  await axios.get(`http://localhost:3000/userProfile/${userId}`)

                console.log(response.data.starRepos);
                
                setStarredRepos(response.data.starRepos || [])
                setLoading(false)

            } catch (error) {
                console.error("Error fetchiing star repository: ", error)
                setLoading(false)
            }
        }
        fetchStarRepository()
    }, []);

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
                <h1 className="text-3xl font-bold mb-10 text-gray-400">Starred Repositories</h1>

                {starredRepos.length === 0 ? (
                    <p className="text-lg text-gray-400">You haven't starred any repository yet.</p>
                ) : (
                    <div className="flex flex-col gap-10">
                        {starredRepos.map((repo) =>(
                                <div key={repo._id} className="border-2 rounded-2xl p-5 " >
                                    <div className="flex gap-14 align-middle items-center mb-5">
                                        <h1 onClick={() => {
                                            navigate(`/repo/content/${repo._id}`)
                                        }} 
                                        className='font-bold text-2xl mb-3 capitalize cursor-pointer'>Repository Name : <span className='hover:text-indigo-400'>{repo.name}</span></h1>
                                    </div>
                                    <p className='font-medium text-lg text-gray-500 mb-6'>Description : {repo.description}</p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
  )
}

export default starRepos
