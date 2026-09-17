import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../backButton';
import API_URL from '../../api';


const commitHistory = () => {
    const { id } = useParams()
    const [commits, setCommits] = useState([])

    useEffect(() => {
        const getCommitHistory = async () => {
            try {
                const res = await axios.get(`${API_URL}/commit/repository/${id}`)
                setCommits(res.data.commits)

            } catch (error) {
                console.error("Error fetching commit history: ", error)
            }
        }   
        
        getCommitHistory()
    }, [id])

  return (
        <div className='bg-[#090040] min-h-screen text-white flex flex-col items-center overflow-auto'>
            <Navbar />
            <div className='bg-[#471396] min-h-screen w-[95%] sm:w-[92%] md:w-[90%] rounded-xl m-4 p-5'>
                <BackButton/>
                <h1 className="text-xl sm:text-2xl font-bold mb-5">Commit History :</h1>

                {commits.length === 0 ? (
                    <p className="text-lg text-gray-400">No commits yet.</p>
                ) : (
                    <div className="flex flex-col gap-5 sm:gap-7 md:gap-10">
                        {commits.map((commit) =>(
                                <div key={commit.commitId} className="border-2 rounded-2xl p-5 transition-all duration-250 hover:-translate-y-1 hover:shadow-xl hover:border-[#B13BFF]" >
                                    <h3 className="text-xl font-semibold py-2 wrap-break-word">
                                        Message: <span className="text-lg font-medium">{commit.message}</span>
                                    </h3>
                                    <p className="font-medium text-lg mb-2 wrap-break-word">
                                        Commit ID: <span className="font-mono break-all">{commit.commitId}</span>
                                    </p>
                                    <p className="text-gray-400 text-sm wrap-break-word">
                                        Date: {new Date(commit.date).toLocaleString()}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
  )
}

export default commitHistory
