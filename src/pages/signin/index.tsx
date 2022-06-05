import { Form } from '@/components/Form';
import React from 'react';
import { Input } from '@/components/Form';
import Button, { ButtonText } from '@/components/Button';
function Example() {
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or <ButtonText to="/register">Make new account</ButtonText>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form onSubmit={() => {}}>
              <Input
                name="email"
                label="Email address"
                type="email"
                autoComplete="email"
                required
              />
              <Input
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                required
              />
              <div className="flex justify-end">
                <ButtonText to="/forget-password">
                  Forgot your password?
                </ButtonText>
              </div>
              <Button className="flex w-full justify-center">Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
const SignIn = () => {
  return (
    <div className="">
      <Example />
    </div>
  );
};
export default SignIn;
