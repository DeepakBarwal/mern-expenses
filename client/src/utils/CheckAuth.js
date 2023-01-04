import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAuth = ({children}) => {
    const token = Cookies.get('token');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsLoading(false);
            if (!res.ok) {
                return navigate('/login');
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }
    return children;
};

export default CheckAuth;