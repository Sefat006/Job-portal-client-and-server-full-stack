import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import loginLottieData from '../../assets/login.json'
import AuthContext from '../../Context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';

const SignIn = () => {
    const {signInUser} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log('in sign in page ',location);
    const from = location.state || '/';

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInUser(email, password)
        .then(result => {
            console.log("sign In", result.user)
            navigate(from);
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center w-96 lg:text-left">
      <Lottie animationData={loginLottieData}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
      <h1 className="text-5xl text-center font-bold">Login now!</h1>
        <form onSubmit={handleSignIn} className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Sign In</button>
          <p>Don't have an account? <span className='text-blue-400 hover:text-lg font-bold'><Link to="/register">Register</Link></span></p>
          <div className="divider">Or</div>
          <div className='text-center'>
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

export default SignIn;