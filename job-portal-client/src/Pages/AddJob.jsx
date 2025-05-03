import React from 'react';
import Swal from 'sweetalert2';
import UseAuth from './Hook/UseAuth';

const AddJob = () => {
    const { user } = UseAuth()

    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        console.log(initialData);

        const {min, max, currency, ...newJob} = initialData;
        newJob.salaryRange = {min, max, currency}
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');
        console.log(newJob);
        

        //after receiving formdata, now we have to work on back-end
        // 1st: fetch data
        fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(newJob)
        })
        .then( res => res.json())
        .then( data => {
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your job has been applied",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/myApplications')
                }
        })
    }
    return (
        <div className='text-center mx-auto w-10/12'>
            <h2 className="text-3xl">Post a new Job</h2>
            <form onSubmit={handleAddJob} className="fieldset">
                <label className="label">Job Title</label>
                <input type="text" name='title' className="input" placeholder="Job Title" />
                <label className="label">Job Location</label>
                <input type="text" name='location' className="input" placeholder="Job Location" />
                
                {/* Job Category */}
                <label className="label">Job Type</label>
                <select defaultValue="pick a job" name="job_type" className="select select-ghost">
                    <option disabled={true}>Pick a Job type</option>
                    <option>Full-time</option>
                    <option>Intern</option>
                    <option>part-time</option>
                </select>
                {/* Job Category */}
                <label className="label">Job Type</label>
                <select defaultValue="pick a job" name="category" className="select select-ghost">
                    <option disabled={true}>Pick a Job type</option>
                    <option>Engineering</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>Teaching</option>
                </select>
                {/* salary Range */}
                <label className="label">Salary Range</label>
                <div className='grid grid-cols-3 gap-3'>
                    {/* Min */}
                <input type="text" name='min' className="input input-bordered" placeholder="min" />
                {/* max */}
                <input type="text" name='max' className="input input-bordered" placeholder="max" />
                {/* Currency */}
                <select defaultValue="pick a currency" name='currency' className="select select-ghost">
                    <option disabled={true}>Pick a Currency</option>
                    <option>BDT</option>
                    <option>USD</option>
                    <option>INR</option>
                </select>
                </div>
                {/* Job description */}
                <label className="label">Job Description</label>
                <textarea className='textarea textarea-bordered' placeholder='Job Description' name="description" id=""></textarea>
                {/* Company Name */}
                <label className="label">Company name</label>
                <input type="text" name='company' className="input" placeholder="Company name" />
                {/* Job Requirements */}
                <label className="label">Job Requirements</label>
                <textarea className='textarea textarea-bordered' placeholder='Put each requirements on new line' name="requirements" id=""></textarea>
                {/* Responsibilities  */}
                <label className="label">Job Responsibilities</label>
                <textarea className='textarea textarea-bordered' placeholder='Write each responsibilities on new line' name="responsibilities" id=""></textarea>
                 {/* HR Name */}
                 <label className="label">HR name</label>
                <input type="text" name='hr_name' className="input" placeholder="HR name" />
                 {/* HR email */}
                 <label className="label">HR email</label>
                <input defaultValue={user?.email} type="text" name='hr_email' className="input" placeholder="HR email" />
                 {/* Company Logo URL*/}
                 <label className="label">Company Logo URL</label>
                <input type="text" name='company_logo' className="input" placeholder="Company Logo URL" />
                {/* Submit button */}
                <button className="btn btn-neutral mt-4">Submit</button>
            </form>
        </div>
    );
};

export default AddJob;