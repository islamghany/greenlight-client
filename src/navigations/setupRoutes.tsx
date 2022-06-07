import { Navigate, RouteObject } from 'react-router-dom';
import HomeLayout from '@/layout/HomeLayout';
import Home from '@/pages/home';
import Movie from '@/pages/movie';
import NotFound from '@/pages/404';
import Movies from '@/pages/movies';
import AuthLayout from '@/layout/AuthLayout';
import SignIn from '@/pages/signin';
import Register from '@/pages/register';
import ForgetPassword from '@/pages/forgetPassword';
import PasswordRecovery from '@/pages/passwordRecovery';
const routes: RouteObject[] = [
  {
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'movies',
        children: [
          {
            index: true,
            element: <Movies />,
          },
          {
            path: ':id',
            element: <Movie />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forget-password',
        element: <PasswordRecovery />,
      },
      {
        path: 'recovery',
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: '404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
