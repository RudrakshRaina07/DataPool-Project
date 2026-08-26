import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar'

const RepoContent = () => {
    const {id} = useParams()
    const [repo, setRepo] = useState("")

    const [fileContent, setFileContent] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchRepo = async() => {
            try {
                const res = await axios.get(`http://localhost:3000/repo/${id}`)
                setRepo(res.data)
            } catch (error) {
                console.error("Error in fetching repository: ", error)
            }
        }

        fetchRepo()
    }, [id])

    const handleFileClick = async (file) => {
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:3000/file/content`, {
                s3Key: file.s3Key,
            })

            setFileContent(res.data.content)
            setSelectedFile(file.fileName)

            setLoading(false)
        } catch (error) {
            console.error("Error fetching file content: ", error)
            setLoading(false)
        }
    }

    if(!repo){
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
            <div className='bg-[#471396] min-h-screen w-[95%] rounded-xl m-4 p-6 overflow'>
                {repo.content && repo.content.length > 0 ? (
                    repo.content.map((file, index) => {
                        return (
                            <div key={index} className='mb-5 border rounded-3xl p-6 transition-all duration-250 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B13BFF] hover:border-2'>
                                <h2 
                                    onClick={() => {
                                        handleFileClick(file)
                                    }}
                                    className='font-bold text-xl mb-4'>Filename: <span className=''>{file.fileName}</span></h2>
                                <p className='font-semibold text-lg text-gray-400'>Commit: <span className='font-mono break-all'>{file.commitId}</span></p>
                                <p className='font-semibold text-lg text-gray-400'> S3 Key: <span className='font-mono break-all'>{file.s3Key}</span></p>
                            </div>
                        )
                    })
                    ) : (
                        <p>No files pushed yet.</p>
                    )
                }
                {loading ? (
                    <div>
                        <h2>Loading....</h2>
                    </div>
                    ) : selectedFile ? (
                        <>
                            <h2>
                                {selectedFile}
                            </h2>
                            <div>
                                <pre>
                                    <code>
                                        {fileContent}
                                    </code>
                                </pre>
                            </div>
                        </>
                    ) : (
                        <div>
                            Select a file to view its content
                        </div>
                )}
            </div>
        </div>        
    )
}

export default RepoContent
