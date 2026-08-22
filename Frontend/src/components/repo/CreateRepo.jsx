import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateRepo = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [visibility, setVisibility] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = async() => {
        if(!name){
            alert("Repository name is required")
            return;
        }

        try {
            setLoading(true)

            const owner = await localStorage.getItem("userId")

            const res = await axios.post("http://localhost:3000/repo/create", {
                name, 
                description, 
                visibility, 
                owner,
                issues: [],
            })

            alert("Repository created successfully")
            setLoading(false)

            navigate("/")
        } catch (error) {
            console.error("Error creating repository :", error);
            alert("Failed to create repository")
            setLoading(false)
        }
    }

  return (
    <div className="flex flex-col justify-between h-screen bg-[#090040] items-center text-white overflow-auto ">
        <div className="bg-[#471396] mt-10 w-[50%] h-[90%] p-8 rounded-2xl flex flex-col gap-10 ">
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold text-2xl'>Fill the required details</h1>
                </div>
                <div className='w-[90%] p-3'>
                    <label className='text-xl font-bold text-gray-400' >Name of repository :</label>
                    <input 
                        type='text'
                        placeholder='Enter name of repository'
                        className="border-b w-full font-medium text-lg outline-none py-4"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className='w-[90%] p-3'>
                    <label className='text-xl font-bold text-gray-400 '>Description of repository :</label>
                    <textarea 
                        type='text'
                        placeholder='Enter description of the repository'
                        className="border-b w-full font-medium text-lg outline-none py-6"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </div>
                <div className='w-[90%] p-5 gap-10 flex'>
                    <label className='text-xl font-bold text-gray-400 ' > Set visibility of repository :</label>
                    <button 
                        onClick={() =>{
                            setVisibility(true)
                        }}
                        className={`px-6 py-3 rounded-full active:scale-95 cursor-pointer ${visibility ? 'bg-green-600 text-black' : 'bg-gray-600 text-white'}`}>
                        Public
                    </button>
                    <button 
                        onClick={() =>{
                            setVisibility(false)
                        }}                        
                        className={`px-6 py-3 rounded-full active:scale-95 cursor-pointer ${visibility ? 'bg-gray-600 text-white' : 'bg-green-600 text-black'}`}>
                        Private
                    </button>
                </div>
                <div className='flex justify-center items-center mb-4'>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-3 font-medium text-lg rounded-full active:scale-95 cursor-pointer bg-green-600 text-black mg-4">
                            {loading ? "Creating..." : "Create Repository"}
                        </button>
                </div>
        </div>
    </div>
  )
}

export default CreateRepo
