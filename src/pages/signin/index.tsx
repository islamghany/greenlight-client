import React from 'react';
import SigninForm from './SigninForm';
import { FormContainer, FormHead } from '@/components/Form';

const SignIn = () => {
  return (
    <FormContainer>
      <FormHead
        title="Sign in to your account"
        to="/register"
        navText="Make new account"
      />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SigninForm />
      </div>
    </FormContainer>
  );
};
export default SignIn;
