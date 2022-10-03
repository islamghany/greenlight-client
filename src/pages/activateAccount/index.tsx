import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import { useActivateUserMutation } from '@/store/api';

type ActivateAccountPathProps = {
  token: string;
};

const ActivateActountSend = (props: ActivateAccountPathProps) => {
  const [activateUser, { data, isSuccess, isError, error }] =
    useActivateUserMutation();

  useEffect(() => {
    activateUser({ body: { token: props.token } });
  }, []);

  if (isError) {
    return (
      <Alert type="error" title="Invalid Token">
        {error && 'data' in error
          ? JSON.stringify(error.data)
          : 'unknown error'}
      </Alert>
    );
  }
  if (isSuccess) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full flex justify-center h-full mt-12 items-center">
      <Spinner size="lg" />
    </div>
  );
};

const ActivateAccount = () => {
  const { token } = useParams<ActivateAccountPathProps>();

  if (token)
    return (
      <div className="w-full h-full max-w-4xl p-5 mx-auto">
        <ActivateActountSend token={token} />
      </div>
    );
  return null;
};

export default ActivateAccount;
