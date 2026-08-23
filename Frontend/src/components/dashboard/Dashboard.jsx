import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./Dashboard.css"
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [repositories, setRepositories] = useState([]);
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const fetchRepositories = async () =>{
            try {
                const res = await axios.get(`http://localhost:3000/repo/user/${userId}`);

                const data = res.data;
                console.log(data);
                setRepositories(data.repositories);
            } catch (err) {
                console.error("Error in fetching repository:", err)
            }
        }

        const fetchSuggestedRepostitories = async () =>{
            try {
                const res = await axios.get(`http://localhost:3000/repo/all`);

                const data = res.data;
                console.log(data);
                setSuggestedRepositories(data);
            } catch (err) {
                console.error("Error in fetching repository:", err)
            }
        }

        fetchRepositories();
        fetchSuggestedRepostitories();
    }, []); 

    useEffect(() =>{
        if(searchQuery == ""){
            setSearchResults(repositories);
        }else{
            const filteredRepos = repositories.filter((repo) =>{
                return repo.name.toLowerCase().includes(searchQuery.toLowerCase());
            });

            setSearchResults(filteredRepos);
        }
    },[searchQuery, repositories]);

    return (
        <>
            <Navbar/>
            <div className='flex justify-between bg-[#090040] h-screen w-full p-6 gap-5 text-white'>
                <div className='bg-linear-to-br from-[#471396] to-[#6b21a8] w-[25%] p-7 leading-8 rounded-xl'>
                    <h3 className='text-2xl font-bold mb-5'>Suggested Repositories :</h3>
                    {suggestedRepositories.map((repo) =>{
                        return(
                            <div 
                                className='text-lg border m-4 rounded-2xl p-4  w-full transition-all duration-250 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B13BFF] hover:border-2'
                                key={repo._id} > 
                                <h4
                                    className='font-bold mb-2 hover:underline'>{repo.name}</h4>
                                <p className='font-medium'>Description : {repo.description}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='bg-linear-to-br from-[#471396] to-[#6b21a8] w-[50%] p-8 leading-8 rounded-xl'>
                    <h3 className='text-2xl font-bold mb-5 text-center'>Your Repositories</h3>
                    <div className='flex justify-center'>
                        <input 
                            type='text'
                            value={searchQuery}
                            className='placeholder-white w-[75%] py-2 px-4 font-medium rounded-full outline-1 focus:outline-none focus:ring-2 focus:ring-[#B13BFF]'
                            placeholder='Search...'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {searchResults.length === 0 ? (
                        <p className='text-center text-lg mt-3'>
                            No repositories found. Create your first repository.
                        </p>
                    ) : (
                        searchResults.map((repo) =>{
                            return(
                                <div 
                                    className='text-lg border m-4 rounded-2xl p-4  w-full transition-all duration-250 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B13BFF] hover:border-2'
                                    key={repo._id} > 
                                    <h4 
                                        onClick={() => {
                                            navigate(`/repo/${repo._id}`)
                                        }}
                                        className='font-bold mb-2 cursor-pointer hover:underline'>
                                        {repo.name}
                                    </h4>
                                    <p className='font-medium'>Description : {repo.description}</p>
                                </div>
                            )
                        })
                    )}
                    
                </div>
                <div className='bg-linear-to-br from-[#471396] to-[#6b21a8] w-[25%] p-7 leading-8 rounded-xl'>
                    <h3 className='text-2xl font-bold mb-5 text-center'>Upcoming Events : </h3>
                    <ul className='text-white font-medium leading-11 text-center'>
                        <li>
                            <p>Developer Meetup - 28,July</p>
                        </li>
                        <li>
                            <p>Hackathon Fusion - 31,July</p>
                        </li>
                        <li>
                            <p>Tech Workshop - 1,August</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Dashboard;