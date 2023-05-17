import React, { useEffect, useState } from 'react';
import VolunteerCard from './VolunteerCard';

const Home = () => {

    const [volunteers, setVolunteers] = useState([])
    const [searchText, setSearchText] = useState('')




    useEffect(() => {
        fetch(`http://localhost:5000/volunteers/${searchText || '1'}`)

            .then(res => res.json())
            .then(data => {
                console.log(data)
                setVolunteers(data)
            })
    }, [searchText])
    // console.log(searchText)



    const handleSearch = (event) => {
        event.preventDefault()
        const search = event.target.search.value

        console.log(search)

        setSearchText(search)

    }



    return (
        <div className='m-10'>
            <div className='my-10 text-center mx-auto'>
                <h2 className='text-4xl font-semibold '>I grow by helping people in need.</h2>


                <div className="flex justify-center  my-4">

                    <div>
                        <form className="isolate rounded-none flex items-center" onSubmit={handleSearch}>
                            <input name='search' type="text" placeholder="Search…" className="input input-bordered" />
                            <button className="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </form>
                    </div>

                </div>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-11  my-10'>
                {
                    volunteers && volunteers.map(volunteer => <VolunteerCard key={volunteer.title} volunteer={volunteer}></VolunteerCard>)
                }
            </div>


        </div>
    );
};

export default Home;