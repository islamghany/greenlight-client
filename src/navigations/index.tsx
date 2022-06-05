import HomeLayout from '@/layout/HomeLayout';
import { RouteObject, useRoutes } from 'react-router-dom';
import routes from './setupRoutes';

const Navigations = () => {
  const nav = useRoutes(routes);
  return nav;
};

export default Navigations;
