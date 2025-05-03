import React from 'react';
import { Link, useLoaderData } from 'react-router';

const JobDetails = () => {
    // 1. goto router.jsx and declare a loader path for job details
    // 2. write code index.js
    const {_id, title, company, deadline} = useLoaderData();


    return (
        <div className='text-center'>
            <h1 className='font-bold text-2xl'>Job details for {title}</h1>
            <p className='text-xl'>Apply for : {company}</p>
            <p>deadline : {deadline}</p>
            <Link to={`/jobApply/${_id}`}>
            <button className="btn btn-primary">
                Apply Now
            </button>
            </Link>
        </div>
    );
};

export default JobDetails;