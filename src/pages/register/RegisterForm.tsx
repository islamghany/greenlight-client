import { FormBody } from '@/components/Form'
import { Input } from '@/components/Form'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import {
  validateEmail,
  validatePassword,
  validateName,
} from '@/helpers/validation'
import { CreateUser } from '@/types'
import { useAppDispatch } from '@/store'
import { setUser } from '@/store/slices/userSlice'
import Alert from '@/components/Alert'
import api from '@/api'
import { useApi } from '@/hooks/useApi'

const Register = () => {
  const dispatch = useAppDispatch()
  const { error, isPending, isSuccess, exec } = useApi(
    (e: CreateUser) =>
      api.usersApi.registerUser(e).then((res) => res.data.user),
    {
      onSuccess: (data) => {
        dispatch(setUser(data!))
      },
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>()
  const onSubmit = handleSubmit((e) => {
    exec(e)
  })
  if (isSuccess) {
    return (
      <Alert title='Success Registeration' type='success'>
        congratulations, your account has been established successfully but not
        yet activated, to activate your account{' '}
        <span className='font-bold'>
          Follow the instructions that have been sent to your email.
        </span>
      </Alert>
    )
  }
  return (
    <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
      {error && (
        <Alert title='Error' type='error'>
          {error}
        </Alert>
      )}
      <FormBody onSubmit={onSubmit}>
        <Input
          label='Full name'
          type='text'
          name='name'
          register={register('name', {
            required: true,
            minLength: 8,
            maxLength: 72,
          })}
          error={validateName(errors)}
        />
        <Input
          label='Email address'
          type='text'
          autoComplete='email'
          name='email'
          register={register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
          })}
          error={validateEmail(errors)}
        />
        <Input
          name='password'
          label='Password'
          type='password'
          register={register('password', {
            required: true,
            minLength: 8,
            maxLength: 72,
          })}
          error={validatePassword(errors)}
        />
        <Button
          type='submit'
          loading={isPending}
          className='flex w-full justify-center'
        >
          Submit
        </Button>
      </FormBody>
    </div>
  )
}

export default Register
