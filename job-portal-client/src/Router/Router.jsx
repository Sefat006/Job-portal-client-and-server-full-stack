import React from 'react';
import { createBrowserRouter } from 'react-router';
import Home from '../Pages/Home';
import MainLayout from '../Layouts/MainLayout';
import Register from '../Pages/Register Login/Register';
import SignIn from '../Pages/Register Login/SignIn';
import JobDetails from '../Pages/JobDetails';
import PrivateRoute from './PrivateRoute';
import JobApply from '../Pages/JobApply';
import MyApplications from '../Pages/MyApplications';
import AddJob from '../Pages/AddJob';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <h1>404, this page is not found</h1>,
        children: [
            {
                // in children, index will only use if the path of the parent route and children route is same, here '/' is used for both mainLayout and Home path
                index: true,
                element: <Home></Home>
            },
            {
                path:'/jobs/:id',
                element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)
            },
            {
                path:'/jobApply/:id',
                element: <PrivateRoute><JobApply></JobApply></PrivateRoute>,
            },
            {
                path:'/myApplications',
                element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>,
            },
            {
                path:'addJob',
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>,
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'signin',
                element: <SignIn></SignIn>
            },
        ]
    }
])

export default Router;