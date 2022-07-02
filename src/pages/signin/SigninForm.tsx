import React from 'react';
import { FormBody } from '@/components/Form';
import { Input } from '@/components/Form';
import Button, { ButtonText } from '@/components/Button';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/helpers/validation';
import { AuthenticateUser } from '@/types';
import { useAppDispatch } from '@/store';
import Alert from '@/components/Alert';
import { useApi } from '@/hooks/useApi';
import api from '@/api';
import { setUser } from '@/store/slices/userSlice';

const SigninForm = () => {
  const { error, isError, isPending, exec } = useApi((e: AuthenticateUser) =>
    api.tokensApi.signinUser(e).then((res) => res.data)
  );

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticateUser>();
  const onSubmit = handleSubmit(async (e) => {
    const { data } = await exec(e);
    if (data) {
      dispatch(setUser(data));
    }
  });
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {isError && error && (
        <Alert title="Error" type="error">
          {error}
        </Alert>
      )}
      <FormBody onSubmit={onSubmit}>
        <Input
          label="Email address"
          type="text"
          autoComplete="email"
          name="email"
          register={register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
          })}
          error={validateEmail(errors)}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          register={register('password', {
            required: true,
            minLength: 8,
            maxLength: 72,
          })}
          required
          error={validatePassword(errors)}
        />
        <div className="flex justify-end">
          <ButtonText to="/forget-password">Forgot your password?</ButtonText>
        </div>
        <Button
          type="submit"
          loading={isPending}
          className="flex w-full justify-center"
        >
          Submit
        </Button>
      </FormBody>
    </div>
  );
};

export default SigninForm;
