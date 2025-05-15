import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL : 'https://job-portal-server-snowy-psi.vercel.app',
    withCredentials: true,
})
const useAxiosSecure = () => {
    
    const {signOutUser } = useAuth();
    // navigate is used for 
    // if anyone gets signed Out, then which page he'll returned to
    const navigate = useNavigate();

    useEffect(()=> {
        axiosInstance.interceptors.response.use( response => {
            return response;
        }, error => {
            console.log('error caught in interceptors', error);

            if(error.status === 401 || error.status === 403){
                console.log('you need to logout the user');
                signOutUser()
                .then(() => {
                    console.log('logged out user')
                    // if user get's signed out,
                    // he'll returned to signIn page
                    navigate('/signIn');
                })
                .catch(error => console.log(error));
            }
            return Promise.reject(error);
        })
    }, [])

    return [axiosInstance];
};

export default useAxiosSecure;