import ButtonAppBar from './components/AppBar';
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from './store/auth';
import Cookies from 'js-cookie';

function App() {
  const token = Cookies.get('token');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    setIsLoading(true);
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setIsLoading(false);

        if (res.ok) {
          const user = await res.json();
          dispatch(getUser(user));
        }
    } catch (error) {
        console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ButtonAppBar />

      <Outlet />
    </div>
  );
}

export default App;
