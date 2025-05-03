import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import registerLottieData from '../../assets/register.json';
import AuthContext from '../../Context/AuthContext';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';

const Register = () => {

  const { createUser } = useContext(AuthContext);

    const handleRegister = e => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);

      //password validation error
      createUser(email, password)
      .then(result => {
        console.log(result.user)
      })
      .catch(error => {
        console.log(error.message)
      })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center w-96 lg:text-left">
      <Lottie animationData={registerLottieData}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
      <h1 className="text-5xl text-center font-bold">Register now!</h1>
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input" placeholder="Name" />
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
          <button className="btn btn-neutral mt-4">Register</button>
          <p>Already have an account? <span className='text-blue-400 hover:text-lg font-bold'><Link to="/signin">Sign In</Link></span></p>
          <div className="divider">Or</div>
          <div className='text-center '>
          <label className='text-xl'>Sign in with </label>
            <SocialLogin></SocialLogin>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;