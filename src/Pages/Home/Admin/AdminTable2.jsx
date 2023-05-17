import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const AdminTable2 = ({ userBooking, handleDelete }) => {
    const { name, email, title, date, _id } = userBooking
    return (

        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{title}</td>
            <td>{date}</td>
            <td> <FaTrashAlt onClick={() => handleDelete(_id)} className='text-red-800'></FaTrashAlt> </td>

        </tr>

    );
};

export default AdminTable2;