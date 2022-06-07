import React from 'react';
import { FormBody } from '@/components/Form';
import { Input } from '@/components/Form';
import Button, { ButtonText } from '@/components/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '@/helpers/validation';
import { CreateUser } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { registerUser } from '@/store/slices/userSlice';
import Alert from '@/components/Alert';
import api from '@/api';

const Register = () => {
  const registerStatus = useAppSelector((state) => state.user.registerStatus);
  const registerUserError = useAppSelector(
    (state) => state.user.registerUserError
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();
  const onSubmit = handleSubmit((e) => {
    dispatch(registerUser(e));
  });
  if (registerStatus === 'SUCCESS') {
    return (
      <Alert title="Success Registeration" type="success">
        congratulations, your account has been established successfully but not
        yet activated, to activate your account{' '}
        <span className="font-bold">
          Follow the instructions that have been sent to your email.
        </span>
      </Alert>
    );
  }
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {registerUserError && (
        <Alert title="Error" type="error">
          {registerUserError}
        </Alert>
      )}
      <FormBody onSubmit={onSubmit}>
        <Input
          label="Full name"
          type="text"
          name="name"
          register={register('name', {
            required: true,
            minLength: 8,
            maxLength: 72,
          })}
          error={validateName(errors)}
        />
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
          error={validatePassword(errors)}
        />
        <Button
          type="submit"
          loading={registerStatus === 'PENDING'}
          className="flex w-full justify-center"
        >
          Submit
        </Button>
      </FormBody>
    </div>
  );
};

export default Register;
