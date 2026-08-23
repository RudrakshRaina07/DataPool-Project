import React from 'react'
import Navbar from '../Navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const RepoDetail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    
    const [repo, setRepo] = useState("")
    const [issues, setIssues] = useState([])


    useEffect(() => {
        const fetchRepo = async() => {
            try {
                const res = await axios.get(`http://localhost:3000/repo/${id}`)
                setRepo(res.data)
            } catch (error) {
                console.error("Error fetching repo :", error)
            }   
        }
        fetchRepo()
    },[id])

    if(!repo){
        return (
            <div className='bg-[#090040] h-screen text-white flex flex-col items-center'>
                <Navbar />
                <h1 className='mt-10'>Loading....</h1>
            </div>
        )
    }

    const handleToggleVisibility = async () => {
        try {
            await axios.patch(`http://localhost:3000/repo/toggle/${id}`)
            setRepo({...repo, visibility: !repo.visibility})
        } catch (error) {
            console.error("Error toggling visibility :", error)
        }
    }

    const handleDeleteRepository = async () => {
        if(window.confirm("Are you sure you want to delete the repository? ")){
            try {
                await axios.delete(`http://localhost:3000/repo/delete/${id}`)
                navigate('/')
            } catch (error) {
                console.error("Error while deleting repository :", error)
            }   
        }
    }

    return (
        <div className='bg-[#090040] h-screen text-white flex flex-col items-center'>
            <Navbar />
            <div className='bg-[#471396] h-screen w-[95%] rounded-xl m-4 p-5'>
                <div className='border p-6 rounded-xl'>
                    <h1 className='font-bold text-xl mb-3'>Repository Name : {repo.name}</h1>
                    <p className='font-medium text-lg text-gray-500 mb-6'>Description : {repo.description}</p>
                    <span
                        className={`rounded-full font-medium py-3 px-6 ${repo.visibility ? "bg-green-700" : "bg-gray-700"}`}
                    >{repo.visibility ? "Public" : "Private"}</span>
                    <div className='mt-7 flex gap-10'>
                        <button
                            onClick={() => {
                                handleToggleVisibility()
                            }}
                            className={`px-6 py-3 rounded-full bg-indigo-500  font-medium cursor-pointer`}    
                        >
                            Toggle Visibility
                        </button>
                        <button 
                            onClick={() => {
                                handleDeleteRepository()
                            }}
                            className='px-6 py-3 rounded-full bg-red-600 font-medium cursor-pointer'>
                            Delete Repository
                        </button>
                    </div>

                </div>
                <div className='border p-6 rounded-xl mt-5'>
                    <div>
                        {issues.length === 0 ? (
                            <p>
                                No Issues yet. Create your first issue.
                            </p>
                        ) : (
                            issues.map((issue)=> {
                                return (
                                    <div>
                                        <h1>{issue.title}</h1>
                                        <p>{issue.description}</p>
                                        <span>{issue.status}</span>
                                    </div>
                                )
                            })
                        )}
                        <div className='mt-5'>
                            <button 
                                onClick={() => {
                                     console.log("Current repo id:", id);
                                    navigate(`/issue/create/${repo._id}`)
                                }}
                                className='px-6 py-3 rounded-full bg-green-700 font-medium'>Create Issue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RepoDetail
