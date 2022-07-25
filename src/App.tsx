import React from 'react';
import { hot } from 'react-hot-loader';
import Navigations from '@/navigations';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import WithUser from './helpers/WithUser';

const App = () => {
  return (
    <Provider store={store}>
      <WithUser>
        <Router>
          <Navigations />
        </Router>
      </WithUser>
    </Provider>
  );
};

export default hot(module)(App);
