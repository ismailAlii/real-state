import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { Layout, RequireAuth } from './routes/layout/Layout';
import HomePage from './routes/homePage/HomePage';
import ListPage from './routes/listPage/ListPage';
import SinglePage from './routes/singlePage/SinglePage';
import ProfilePage from './routes/profile/ProfilePage';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import ProfileUpdatePage from './routes/profileUpdatePage/ProfileUpdatePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/list',
        element: <ListPage />,
      },
      {
        path: '/:id',
        element: <SinglePage />,
      },

      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile/update',
        element: <ProfileUpdatePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
