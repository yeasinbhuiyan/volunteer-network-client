import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const VolunteerCard = ({ volunteer }) => {
    const { title, img, description, _id, date } = volunteer
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const handleBooking = () => {
        if (user) {
            const volunteer = {
                name: user.displayName,
                email: user.email,
                title,
                img,
                date

            }
            fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(volunteer)

            })

        }
        else {
            alert('Please Login')

            return navigate('/login')

        }


    }
    return (
        <div className="card h-full w-full bg-base-100 shadow-xl">
            <figure><img className='w-96 h-64' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <Link onClick={() => handleBooking()} className="card-title hover:link-hover">{title}</Link>
                {/* <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
            </div>
        </div>
    );
};

export default VolunteerCard;