import React from 'react';
import { useApi } from '@/hooks/useApi';
import api from '@/api';
import { ActivateUserRequest } from '@/types';
import { useParams } from 'react-router-dom';
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/slices/userSlice';

type ActivateAccountPathProps = {
  token: string;
};

const ActivateActountSend = (props: ActivateAccountPathProps) => {
  const dispatch = useAppDispatch();
  const { error } = useApi(
    (e: ActivateUserRequest) =>
      api.usersApi.activateUser(e).then((res) => res.data.user),
    {
      enabled: true,
      enabledData: { token: props.token },
      onSuccess: (data) => {
        if (data) dispatch(setUser(data));
      },
    }
  );

  if (error) {
    return (
      <Alert type="error" title="Invalid Token">
        {error}
      </Alert>
    );
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
