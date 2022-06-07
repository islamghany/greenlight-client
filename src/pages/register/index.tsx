import React from 'react';
import { ButtonText } from '@/components/Button';
import Register from './RegisterForm';
import { FormContainer, FormHead } from '@/components/Form';

const SignIn = () => {
  return (
    <FormContainer>
      <FormHead
        title="Make new Account"
        to="/signin"
        navText="Alreay have an account?"
      />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Register />
      </div>
    </FormContainer>
  );
};
export default SignIn;
