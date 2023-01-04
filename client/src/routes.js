import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home.js';
import Login from './pages/Login';
import Register from './pages/Register';


const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
]);

export default router;