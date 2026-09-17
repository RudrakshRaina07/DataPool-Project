import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../backButton';
import API_URL from '../../api';

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
            const res = await axios.post(`${API_URL}/issue/create/${id}`, {
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
    <div className="flex flex-col min-h-screen bg-[#090040] items-center text-white overflow-auto ">
        <div className="bg-[#471396] mt-5 sm:mt-8 md:mt-10 w-[95%] sm:w-[90%] md:w[75%] lg:w-[50%] h-[90%] p-5 min-h-[90vh] sm:p-6 md:p-8 rounded-2xl flex flex-col gap-6 sm:gap-8 md:gap-10 ">
            <BackButton/>
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold text-xl sm:text-2xl text-center'>Fill the required details</h1>
                </div>
                <div className='w-full p-3'>
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
                <div className='w-full p-3'>
                    <label className='text-xl font-bold text-gray-400 '>Description of issue :</label>
                    <textarea 
                        type='text'
                        placeholder='Enter issue of the repository'
                        className="border-b w-full font-medium text-lg outline-none py-6 min-h-32 resize-none"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </div>
                <div className='flex justify-center  items-center mt-4 sm:mt-6'>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-3 font-medium text-lg rounded-full active:scale-95 cursor-pointer bg-green-600 text-black mg-4 transition disabled:cursor-not-allowed disabled:opacity-50">
                            {loading ? "Creating..." : "Create Issue"}
                        </button>
                </div>
        </div>
    </div>
  )
}

export default CreateIssue
