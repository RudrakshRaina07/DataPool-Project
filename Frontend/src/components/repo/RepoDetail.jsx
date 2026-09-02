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

    const token = localStorage.getItem("token")
    const currentUserId = localStorage.getItem("userId")

    const isOwner = repo.owner?._id?.toString() === currentUserId

    useEffect(() => {
        const fetchRepoAndIssue = async() => {
            try {
                const res = await axios.get(`http://localhost:3000/repo/${id}`)
                setRepo(res.data)

                const issuesArr = res.data.issues;
                setIssues(issuesArr)

            } catch (error) {
                console.error("Error fetching repo: ", error)
            }   
        }

        fetchRepoAndIssue()
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
            await axios.patch(`http://localhost:3000/repo/toggle/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setRepo({...repo, visibility: !repo.visibility})
        } catch (error) {
            console.error("Error toggling visibility :", error)
        }
    }

    const handleDeleteRepository = async () => {
        if(window.confirm("Are you sure you want to delete the repository? ")){
            try {
                await axios.delete(`http://localhost:3000/repo/delete/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                navigate('/')
            } catch (error) {
                console.error("Error while deleting repository :", error)
            }   
        }
    }

    return (
        <div className='bg-[#090040] min-h-screen text-white flex flex-col items-center overflow'>
            <Navbar />
            <div className='bg-[#471396] min-h-screen w-[95%] rounded-xl m-4 p-5 overflow'>
                <div className='border p-6 rounded-xl'>
                    <h1 onClick={() => {
                        navigate(`/repo/content/${repo._id}`)
                    }} 
                    className='font-bold text-2xl mb-3 capitalize cursor-pointer'>Repository Name : <span className='hover:text-indigo-400'>{repo.name}</span></h1>
                    <p className='font-medium text-lg text-gray-500 mb-6'>Description : {repo.description}</p>
                    <span
                        className={`rounded-full font-medium py-3 px-6 ${repo.visibility ? "bg-green-700" : "bg-gray-700"}`}
                    >{repo.visibility ? "Public" : "Private"}</span>

                    {isOwner && (
                        <div className='mt-7 flex gap-10'>
                            <button
                                onClick={() => {
                                    handleToggleVisibility()
                                }}
                                className={`px-6 py-3 rounded-full bg-indigo-500  font-medium cursor-pointer active:scale-95`}    
                            >
                                Toggle Visibility
                            </button>
                            <button 
                                onClick={() => {
                                    handleDeleteRepository()
                                }}
                                className='px-6 py-3 rounded-full bg-red-600 font-medium cursor-pointer active:scale-95'>
                                Delete Repository
                            </button>
                            <button 
                                onClick={() => {
                                    navigate(`/commit/repository/${id}`)
                                }}
                                className="px-6 py-3 bg-green-700 rounded-full font-medium cursor-pointer active:scale-95 hover:bg-green-800"
                            >
                                See Commit History
                            </button>
                        </div>
                    )}
                </div>
                <div className='border p-6 rounded-xl mt-5'>
                    <div>
                        <h1 className='text-2xl font-bold'>Issues :</h1>
                        {issues.length === 0 ? (
                            <p>
                                No Issues yet. Create your first issue.
                            </p>
                        ) : (
                            issues.map((issue)=> {
                                return (
                                    <div key={issue._id} className='rounded-2xl py-4 px-8 m-3 border-2 flex justify-between'>
                                        <h1 className='text-xl font-semibold capitalize'>Title: {issue.title}</h1>
                                        <p className='text-gray-500 text-lg font-medium'>Description: {issue.description}</p>
                                        <span className={`px-6 py-3 rounded-full capitalize font-medium ${issue.status === "open" ? "bg-green-700" : "bg-red-500"}`}>{issue.status}</span>
                                    </div>
                                )
                            })
                        )}
                        <div className='mt-5'>
                            <button 
                                onClick={() => {
                                     console.log("Current repo id:", id);
                                    navigate(`/issue/create/${id}`)
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
