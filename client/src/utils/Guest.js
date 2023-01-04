import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const Guest = ({children}) => {
    const token = Cookies.get('token');
    return (
        !token ? children : <Navigate to='/' replace={true} />
    );
};

export default Guest;