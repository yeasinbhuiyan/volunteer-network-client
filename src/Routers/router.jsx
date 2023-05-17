import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../shared/LoginAndRegister/Login";
import Register from "../shared/LoginAndRegister/Register";
import AdminTable from "../Pages/Home/Admin/AdminTable";
import Bookings from "../Pages/Bookings/Bookings";
import AdminForm from "../Pages/Home/Admin/AdminForm";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path : '/adminTable',
                element: <PrivateRoute><AdminTable></AdminTable></PrivateRoute>

            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/bookings',
                element : <PrivateRoute><Bookings></Bookings></PrivateRoute>
            }
            
            ,
            {
                path: '/adminForm',
                element : <PrivateRoute><AdminForm></AdminForm></PrivateRoute>
            }
            
        ]
    }
])

export default router