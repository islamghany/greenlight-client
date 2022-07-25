import React from 'react';
import { hot } from 'react-hot-loader';
import Navigations from '@/navigations';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigations />
      </Router>
    </Provider>
  );
};

export default hot(module)(App);
