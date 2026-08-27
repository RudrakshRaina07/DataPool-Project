import axios from 'axios'
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

    const handleCloseFile = async () => {
        setFileContent("")
        setSelectedFile("")
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
                <>
                    <div>
                        { repo.content.map((file, index) => {
                            return (
                                <div key={index} className='mb-5 border rounded-3xl p-6 transition-all duration-250 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B13BFF] hover:border-2'>
                                    <h2 
                                        onClick={() => {
                                            handleFileClick(file)
                                        }}
                                        className='font-bold text-xl mb-4'>Filename: <span className='cursor-pointer hover:text-gray-500'>{file.fileName}</span></h2>
                                    <p className='font-semibold text-lg text-gray-400'>Commit: <span className='font-mono break-all'>{file.commitId}</span></p>
                                    <p className='font-semibold text-lg text-gray-400'> S3 Key: <span className='font-mono break-all'>{file.s3Key}</span></p>
                                </div>
                            )
                        })}
                    </div>

                    {loading ? (
                            <div className="flex justify-center mt-14">
                                <h2 className="font-semibold text-xl text-gray-400">Loading Data....</h2>
                            </div>
                    ) : selectedFile? (
                        <div className="border p-4 mt-4 rounded-3xl " >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="font-bold text-2xl mb-5">
                                    {selectedFile}
                                </h2>
                                <button
                                    onClick={() => {
                                        handleCloseFile()
                                    }}     
                                    className="bg-red-600 px-6 py-3 font-semibold rounded-full cursor-pointer active:scale-95 hover:bg-red-700"
                                >
                                    Close
                                </button>
                            </div>
                            <div className="bg-[#1e1e1e] p-5 overflow-auto rounded-2xl" >
                                <pre className="whitespace-pre-wrap text-sm" >
                                    <code>
                                        {fileContent}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    ) : (
                        <div className="border rounded-3xl p-6 font-medium text-2xl text-gray-400" >
                            Select a file to view its content here
                        </div>
                    )}

                </>

                    ) : (
                        <div className="p-4 flex justify-center mt-10">
                            <p className="text-xl font-medium" >No files pushed yet.</p>
                        </div>
                    )
                }
            </div>
        </div>        
    )
}

export default RepoContent
