import React from 'react'
import { useNavigate } from 'react-router-dom';

const backButton = () => {
    const navigate = useNavigate()
  return (
    <div>
      <button 
        onClick={() => {
            navigate(-1)
        }}
        className="px-6 py-3 rounded-2xl font-semibold bg-indigo-700 hover:bg-indigo-600 active:scale-95 text-white mb-3"
      >Back</button>
    </div>
  )
}

export default backButton
