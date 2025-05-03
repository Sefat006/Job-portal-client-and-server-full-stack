import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';

const SocialLogin = () => {
    const {signInWithGoogle} = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn bg-blue-500">
                Google
            </button>
        </div>
    );
};

export default SocialLogin;