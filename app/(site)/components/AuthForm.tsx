'use client';
import Button from '@/app/components/Button';
import Input from '@/app/components/Inputs/Input';
import React, { useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Props = {};
type Variant = 'LOGIN' | 'REGISTER';

const defaultValues = {
  name: '',
  username: '',
  email: '',
  password: '',
};

const AuthForm = (props: Props) => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      if (variant === 'REGISTER') {
        // Axios Register endpoint
        const response = await axios.post('/api/register', data);
        toast.success(response.data.message || 'Successfully Registration');
        reset(defaultValues);
      }

      if (variant === 'LOGIN') {
        // NextAuth signin
        signIn('credentials', {
          ...data,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials');
          }

          if (callback?.ok && !callback?.error) {
            toast.success('You have successfully log in');
          }
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.error || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth social sign in
    try {
      signIn(action, {
        // callbackUrl: `${window.location.origin}/dashboard`,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error('Something went wrong');
        }

        if (callback?.ok && !callback?.error) {
          toast.success('You have successfully log in');
        }
      });
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  let formContent;

  if (variant === 'REGISTER') {
    formContent = (
      <>
        <Input label="Name" register={register} type="text" id="name" errors={errors} disabled={isLoading} />
        <Input label="Email" register={register} type="email" id="email" errors={errors} disabled={isLoading} />
        <Input label="Username" register={register} type="text" id="username" errors={errors} disabled={isLoading} />
      </>
    );
  }

  if (variant === 'LOGIN') {
    formContent = (
      <>
        <Input
          label="Email or Username"
          register={register}
          type="text"
          id="email"
          errors={errors}
          disabled={isLoading}
        />
      </>
    );
  }

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {formContent}
            <Input
              label="Password"
              register={register}
              type="password"
              id="password"
              showPassword={showPassword}
              handleShowPassword={toggleShowPassword}
              errors={errors}
              disabled={isLoading}
            />
            <div className="">
              <Button fullWidth type="submit" disabled={isLoading}>
                {variant === 'LOGIN' ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Or continue with</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
              <AuthSocialButton icon={FcGoogle} onClick={() => socialAction('google')} />
            </div>
          </div>

          <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500">
            <div className="font-semibold">
              {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
            </div>
            <div className="font-medium underline cursor-pointer" onClick={toggleVariant}>
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
