/* eslint-disable no-constant-condition */
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBeer, FaGithub, FaGoogle } from 'react-icons/fa';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const Login = () => {






    const { loginAccount, google, github } = useContext(AuthContext)


    const googelProvider = new GoogleAuthProvider
    const githubProvider = new GithubAuthProvider


    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/'


    const [error, setError] = useState('')



    const handleLogIn = (event) => {
        event.preventDefault()

        setError('')
        const eventTarget = event.target
        const email = eventTarget.email.value
        const password = eventTarget.password.value




        // eslint-disable-next-line no-useless-escape
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return setError('Please Give Us Your Valid Email')

        }



        loginAccount(email, password)



            .then(result => {
                const logged = result.user
                eventTarget.reset()
                console.log(logged)
                navigate('/')
            })

            .catch((error) => {
                console.log(error.message)
                setError('Password Not Matched')
            })







    }




    const handleGoogleLogin = () => {
        google(googelProvider)
            .then(result => {
                const logged = result.user
                console.log(logged)
                navigate(from)

            })
            .catch((error) => {
                setError(error.message)
                console.log(error.message)
            })
    }



    const handleGithubLogin = () => {
        github(githubProvider)
            .then(result => {
                const logged = result.user
                console.log(logged)
                navigate(from)
            })
            .catch((error) => {
                setError(error.message)
                console.log(error.message)
            })
    }




    return (


        <form onSubmit={handleLogIn} className="main-container p-10  md:hero min-h-screen bg-base-200">
            <div className="flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Please Login</h1>
                </div>
                <div className="flex-shrink-0 w-full max-w-sm  shadow-2xl bg-base-100 mt-5">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input className="input input-bordered" name='email' type="text" placeholder="email" required />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input className="input input-bordered" name='password' type="password" placeholder="password" required />

                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn btn-dark  text-white">Login</button>
                        </div>


                        <p className='text-center text-sm font-semibold'>Or Login With</p>



                        <div className='flex mb-3 gap-4'>
                            <div>
                             
                                <button onClick={handleGoogleLogin} className="btn btn-outline">     <FaGoogle></FaGoogle>    <small>Login With Google</small></button>
                            </div>
                            <div>
                           
                                <button onClick={handleGithubLogin} className="btn btn-outline">  <FaGithub></FaGithub>    <small>Login With Github</small></button>
                            </div>
                        </div>




                        <p><small>Dont you have Account? <Link state={location.state} className='font-semibold' to='/register'>Register</Link></small></p>
                        {/* state={location.state} */}





                        <div>
                            <p className='font-semibold text-red-500'><small>{error}</small></p>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;