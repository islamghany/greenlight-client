interface Errors {
  [x: string]: any;
}
export const validateEmail = (errors: Errors) =>
  errors?.email
    ? errors.email?.message
      ? errors.email.message
      : errors.email?.type === 'required'
      ? 'Email can not be empty'
      : 'Invalid Email'
    : undefined;

export const validatePassword = (errors: Errors) =>
  errors?.password
    ? errors.password?.message
      ? errors.password.message
      : errors.password?.type === 'required'
      ? 'Password can not be empty'
      : 'Password must be at least 8 and ot be more than 72 chars long'
    : undefined;

export const validateName = (errors: Errors) =>
  errors?.name
    ? errors.name?.message
      ? errors.name.message
      : errors.name?.type === 'required'
      ? 'Name can not be empty'
      : 'Name must be at least 8 and ot be more than 72 chars long'
    : undefined;
