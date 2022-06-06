import React from 'react';
import { Form } from '@/components/Form';
import { Input } from '@/components/Form';
import Button, { ButtonText } from '@/components/Button';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/helpers/validation';
import { AuthenticateUser } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { signInUser } from '@/store/slices/userSlice';

const SigninForm = () => {
  const userStatus = useAppSelector((state) => state.user.fetchUserStatus);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticateUser>();
  const onSubmit = handleSubmit((e) => {
    dispatch(signInUser(e));
  });
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <Form onSubmit={onSubmit}>
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
          loading={userStatus === 'PENDING'}
          className="flex w-full justify-center"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SigninForm;
