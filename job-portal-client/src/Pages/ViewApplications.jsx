import React from 'react';
import { useLoaderData } from 'react-router';

const ViewApplications = () => {

    // this will show how many applications have been submitted to this specific post
    const applications = useLoaderData();

    const handleStatusUpdate = (e, id) => {
        
        console.log(e.target.value, id);
    
        // Create a JavaScript object containing the updated status
        // go to server and find app.patch
        // data will be described in server
        const data = {
            status: e.target.value
        }
    
        // Use the fetch API to send a request to your backend server
        fetch(`http://localhost:5000/job-applications/${id}`, {
            method: 'PATCH', // 'PATCH' means we are updating only part of the data (in this case, just the status)
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
    

    return (
        <div>
            <h2 className="text-3xl">
                Applications for this Job : {applications.length};
            </h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>email</th>
        <th>status</th>
        <th>Update Status</th>
        <th>show application</th>
        
      </tr>
    </thead>
    <tbody>
        {
            applications.map( (app, index) => <tr key={app._id}>
                <th>{index+1}</th>
                <td>{app.applicant_email}</td>
                <td>
                    <select onChange={handleStatusUpdate} defaultValue={app.status || 'change status'} className="select select-xs">
                        <option disabled={true}>Change Status</option>
                        <option>Under Review</option>
                        <option>Set Interview</option>
                        <option>Hired</option>
                        <option>Rejected</option>
                    </select>
                </td>
                </tr>)
                }
            </tbody>
            </table>
          </div>
        </div>
    );
};

export default ViewApplications;