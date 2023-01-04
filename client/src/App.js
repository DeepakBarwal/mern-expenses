import ButtonAppBar from './components/AppBar';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './store/auth';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(auth);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div>
      <ButtonAppBar />

      <Outlet />
    </div>
  );
}

export default App;
