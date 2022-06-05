import React from 'react';
import { hot } from 'react-hot-loader';
import Navigations from '@/navigations';
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Navigations />
    </Router>
  );
};

export default hot(module)(App);
