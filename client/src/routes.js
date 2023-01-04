import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home.js';
import Login from './pages/Login';
import Register from './pages/Register';
import CheckAuth from './utils/CheckAuth.js';
import Guest from './utils/Guest';

const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/",
        element: <CheckAuth>
            <Home />
        </CheckAuth>
        },
        {
          path: "/login",
          element: <Guest>
              <Login />
            </Guest>,
        },
        {
          path: "/register",
          element: <Guest>
            <Register />
          </Guest>,
        },
      ],
    },
]);

export default router;