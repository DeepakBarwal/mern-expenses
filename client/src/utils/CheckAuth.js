import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const CheckAuth = ({children}) => {
    const token = Cookies.get('token');
    const fetchUser = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        token ? children : <Navigate to='/login' replace={true} />
    );
};

export default CheckAuth;