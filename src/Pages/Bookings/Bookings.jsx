import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user.email}`, {
            method: 'GET',
            headers: {
                authorize: `bearar ${localStorage.getItem('access-token')}`
            },
        })
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])

    const handleCancle = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/cancel/${id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount) {
                    alert('Cancel Your Bookings')
                    const withOutDeleted = bookings.filter(bf => bf._id !== id)
                    setBookings(withOutDeleted)
                }
            })
    }



    return (
        <div className='m-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
                {
                    bookings.map(booking => <>
                        <div className="card card-side bg-base-100 shadow-xl">
                            <figure><img className='w-72 h-full' src={booking.img} alt="Movie" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{booking.title}</h2>
                                <p>{booking.date}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => handleCancle(booking._id)} className="btn btn-success">Cancle</button>
                                </div>
                            </div>
                        </div>


                    </>)
                }
            </div>
        </div>
    );
};

export default Bookings;