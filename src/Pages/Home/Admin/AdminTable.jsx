import React, { useEffect, useState } from 'react';
import AdminTable2 from './AdminTable2';

const AdminTable = () => {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])


    const handleDelete = (id) => {
        fetch(`http://localhost:5000/cancel/${id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {

                console.log(data)

                if (data.deletedCount > 0) {
                    alert('Volunteer Item Deleted')
                    const withOutdeleted = bookings.filter(bf => bf._id !== id) 
                    setBookings(withOutdeleted)
                }

            }



            )


    }





    return (
        <div>
            <div className="overflow-x-auto m-10">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email Id</th>
                            <th>Volunteer List</th>
                            <th>Registation Date</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map(userBooking => <AdminTable2 handleDelete={handleDelete} key={userBooking._id} userBooking={userBooking}></AdminTable2>)
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AdminTable;