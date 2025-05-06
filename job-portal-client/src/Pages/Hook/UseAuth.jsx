import React, { useContext } from 'react';
import AuthContext from './../../Context/AuthContext';

/* 
    const context = useContext(AuthContext);
    This line lets you access whatever is provided in the AuthContext.Provider — typically the user object, login/logout functions, etc.

    So in your components, instead of repeating: 
        const { user } = useContext(AuthContext);
    You simply use:
        const { user } = UseAuth();

*/




const UseAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default UseAuth;