
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/Group 1329.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const NavigationBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [admin, setAdmin] = useState(false)

    const handleLogOut = () => {
        logOut()

    }

    const navigationlink = <>
        {
            !admin &&
            <>
                <li><Link to='/'>Home</Link></li>
                {user && <li><Link to='/bookings'>Bookings</Link></li>}

                <li><Link> Events </Link></li>
                <li><Link> Blogs </Link></li>


            </>

        }

        {admin &&
            <>  <li><Link to='/adminForm'> Admin Form </Link></li>
                <li><Link to='/adminTable'> Admin Data </Link></li></>
        }

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">





                        {navigationlink}




                    </ul>
                </div>
                <img className='md:w-72 w-24 h-8 md:h-20' src={logo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">

                    {navigationlink}

                </ul>
            </div>
            <div className="navbar-end gap-3">
                {
                    user ? <button onClick={handleLogOut} className='btn btn-outline btn-success'>Log Out</button> :
                        <Link to='/login' className="btn">Login</Link>
                }

                <button onClick={() => setAdmin(!admin)} className='btn btn-success'> Admin </button>



            </div>
        </div>
    );
};

export default NavigationBar;