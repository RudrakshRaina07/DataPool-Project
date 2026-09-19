import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../backButton';
import API_URL from '../../api';

const CreateRepo = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [visibility, setVisibility] = useState(true)
    const [createRepoId, setCreateRepoId] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async() => {
        if(!name){
            alert("Repository name is required")
            return;
        }

        try {
            setLoading(true)

            const token = localStorage.getItem("token")

            const res = await axios.post(`${API_URL}/repo/create`, {
                name, 
                description, 
                visibility, 
                issues: [],
            },
            {
               headers:{
                Authorization: `Bearer ${token}`
               } 
            }
            )

            alert("Repository created successfully")
            console.log(res.data)
            setCreateRepoId(res.data.repositoryId)
            setLoading(false)

            
        } catch (error) {
            console.error("Error creating repository :", error);
            if(error.response?.status === 401){
                localStorage.removeItem("userId")
                localStorage.removeItem("token")

                navigate("/auth")
                return;
            }
            alert("Failed to create repository")
            setLoading(false)
        }
    }

  return (
    <div className="flex flex-col min-h-screen bg-[#090040] items-center text-white overflow-auto ">
        <div className="bg-[#471396] mt-10 w-[95%] sm:w-[90%] md:w-[50%] p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col gap-6 md:gap-10 ">
            <BackButton/>
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold text-xl sm:text-2xl text-center'>Fill the required details</h1>
                </div>
                <div className='w-full p-2 sm:p-3'>
                    <label className='text-lg sm:text-xl font-bold text-gray-400' >Name of repository :</label>
                    <input 
                        type='text'
                        placeholder='Enter name of repository'
                        className="border-b w-full font-medium text-base sm:text-lg outline-none py-3 sm:py-4 bg-transparent"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className='w-full p-2 sm:p-3'>
                    <label className='text-lg sm:text-xl font-bold text-gray-400 '>Description of repository :</label>
                    <textarea 
                        type='text'
                        placeholder='Enter description of the repository'
                        className="border-b w-full font-medium text-base sm:text-lg outline-none py-4 sm:py-6 bg-transparent resize-none"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </div>
                <div className='w-full p-3 sm:p-5 gap-4 sm:gap-6 flex flex-col sm:flex-row sm:items-center'>
                    <label className='text-lg sm:text-xl font-bold text-gray-400 ' > Set visibility of repository :</label>
                    <button 
                        onClick={() =>{
                            setVisibility(true)
                        }}
                        className={`px-5 sm:px-6 py-2 sm:py-3 rounded-full active:scale-95 cursor-pointer transition ${visibility ? 'bg-green-600 text-black' : 'bg-gray-600 text-white'}`}>
                        Public
                    </button>
                    <button 
                        onClick={() =>{
                            setVisibility(false)
                        }}                        
                        className={`px-5 sm:px-6 py-2 sm:py-3 rounded-full active:scale-95 cursor-pointer transition ${visibility ? 'bg-gray-600 text-white' : 'bg-green-600 text-black'}`}>
                        Private
                    </button>
                </div>
                <div className='flex justify-center items-center mb-4'>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-3 font-medium text-base sm:text-lg rounded-full active:scale-95 cursor-pointer bg-green-600 hover:bg-green-700 text-black mg-4">
                            {loading ? "Creating..." : "Create Repository"}
                        </button>
                </div>
                {createRepoId && (
                    <div className='border border-green-500 rounded-xl text-center p-4 sm:p-6 bg-[#090040] '>
                        <h2 className='text-lg sm:text-xl font-bold text-green-400'>Repository Created Successfully</h2>
                        <p className='text-base sm:text-lg font-semibold text-gray-400 mt-4'>Run this command in your project folder:</p>
                        <div className='break-all font-mono text-sm sm:text-base px-8 py-4 m-3 rounded-lg bg-black'>
                            node index.js init {createRepoId}
                        </div>
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center'> 
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        `node index.js init ${createRepoId}`
                                    )
                                }}
                                className='px-6 py-3 rounded-full bg-green-600 active:scale-95 cursor-pointer font-medium text-black hover:bg-green-700 transition'
                            >
                                Copy command
                            </button>
                            
                            <button  
                                onClick={() => {
                                    navigate('/')
                                }}
                                className='px-6 py-3 rounded-full bg-indigo-600 active:scale-95 cursor-pointer font-medium text-white hover:bg-indigo-700 transition'                              
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                )}
        </div>
    </div>
  )
}

export default CreateRepo
