import React, { useEffect, useState } from 'react';
import UseAuth from './Hook/UseAuth';
import { Link } from 'react-router';

const MyPostedJobs = () => {

    // accessing posted jobs
    const [jobs, setJobs] = useState([]);
    const {user} = UseAuth();
    // console.log(user);

    useEffect(() => {
      fetch(`http://localhost:5000/jobs?email=${user.email}`)
        .then(res => res.json())
        .then(data => {setJobs(data)})
    }, [user.email])

    return (
        <div>
            <h2>My Posted Jobs: {jobs.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Deadline</th>
        <th>Job</th>
        <th>show application</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
        {
            jobs.map( (job,index) => <tr>
                <th>{index+1}</th>
                <td>{job.title}</td>
                <td>{job.deadline}</td>
                <td>Blue</td>
              <td>
                {/* this will show how many applications have been submitted to this specific post */}
                <Link to={`/viewApplications/${job._id}`}><button className='btn'>View Applications</button></Link>
              </td>
              </tr>
            )
        }
    </tbody>
  </table>
</div>
         </div>
    );
};

export default MyPostedJobs;