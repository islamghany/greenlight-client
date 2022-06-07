import React from 'react';
import { ButtonText } from '@/components/Button';
import { FormContainer, FormHead } from '@/components/Form';
import { FormBody } from '@/components/Form';
import { Input } from '@/components/Form';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { validateEmail } from '@/helpers/validation';
import { EmailObject } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store';
import Alert from '@/components/Alert';
import { useApi } from '@/hooks/useApi';
import api from '@/api';

const ResetPasswordForm = () => {
  const { data, isPending, exec, error, isSuccess } = useApi(
    (e: EmailObject) =>
      api.tokensApi.createResetPasswordToken(e).then((res) => res.data.messgae),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailObject>();
  const onSubmit = handleSubmit((e) => {
    exec(e);
  });
  if (isSuccess) {
    return (
      <Alert title="Success Registeration" type="success">
        an mail was sent to your email address please follow instruction so that
        you can reset your password.
        <span className="font-bold">
          Follow the instructions that have been sent to your email.
        </span>
      </Alert>
    );
  }
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {error && (
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

        <div className="flex justify-end">
          <ButtonText to="/signin">Already have an account?</ButtonText>
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
const PasswordRecovery = () => {
  return (
    <FormContainer>
      <FormHead title="Reset Your password" />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ResetPasswordForm />
      </div>
    </FormContainer>
  );
};
export default PasswordRecovery;
