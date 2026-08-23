import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CreateIssue = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if(!title || !description){
            alert("Title and decription required")
            return
        }
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:3000/issue/create/${id}`, {
                title,
                description,
            });
            
            alert("Issue created successfully")
            setLoading(false)

            navigate(`/repo/${id}`)
        } catch (error) {
            console.error("Error in creating issue: ", error)
            alert("Failed to create issue")
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
                    <label className='text-xl font-bold text-gray-400' >Title of issue :</label>
                    <input 
                        type='text'
                        placeholder='Enter title of issue'
                        className="border-b w-full font-medium text-lg outline-none py-4"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </div>
                <div className='w-[90%] p-3'>
                    <label className='text-xl font-bold text-gray-400 '>Description of issue :</label>
                    <textarea 
                        type='text'
                        placeholder='Enter issue of the repository'
                        className="border-b w-full font-medium text-lg outline-none py-6"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </div>
                <div className='flex justify-center  items-center mt-8'>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-3 font-medium text-lg rounded-full active:scale-95 cursor-pointer bg-green-600 text-black mg-4">
                            {loading ? "Creating..." : "Create Issue"}
                        </button>
                </div>
        </div>
    </div>
  )
}

export default CreateIssue
