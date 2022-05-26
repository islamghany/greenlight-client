import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import api from './api';
import { HealthCheck200Response } from './types';
const App = () => {
  const [data, setData] = React.useState<HealthCheck200Response | undefined>(
    undefined
  );

  const fetchStatus = async () => {
    try {
      const res = await api.healthCheck();
      setData(res.data);
    } catch (err: any) {
      console.log(err?.respone?.data?.error);
    }
  };
  useEffect(() => {
    fetchStatus();
  }, []);
  return (
    <div className="min-h-screen  flex justify-center items-center">
      {JSON.stringify(data)}
    </div>
  );
};

export default hot(module)(App);
