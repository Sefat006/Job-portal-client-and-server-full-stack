import React from 'react';
import { useNavigate, useParams } from 'react-router';
import UseAuth from './Hook/UseAuth';
import Swal from 'sweetalert2'

const JobApply = () => {

  const { id } = useParams();
  const { user } = UseAuth();
  const navigate = useNavigate();
  // console.log(id, user);

  const submitJobApplication = e => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;

    console.log(linkedIn, github, resume);

    const jobApplication = {
      job_id: id,
      applicant_email: user.email,
      linkedIn,
      github,
      resume,
    }

    fetch('http://localhost:5000/job-applications', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(jobApplication)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/myApplications')
      }
    })
  }

    return (
      <div className="card bg-base-100 w-full item-center text-center shadow-2xl">
      <h1 className="text-5xl font-bold">Job Apply</h1>
      <form onSubmit={submitJobApplication} className="w-full fieldset">
        <label className="label">LinkedIn URL</label>
        <input type="url" name="linkedIn" className="input input-bordered w-full" placeholder="LinkedIn URL" />
        <label className="label">GitHub URL</label>
        <input type="url" name="github" className="input input-bordered w-full" placeholder="GitHub URL" />
        <label className="label">Resume URL</label>
        <input type="url" name="resume" className="input input-bordered w-full" placeholder="Resume URL" />
        <button className="btn btn-neutral mt-4 w-full">Apply</button>
      </form>
    </div>
    
    );
};

export default JobApply;