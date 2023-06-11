'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  showPassword?: boolean;
  handleShowPassword?: () => void;
};

const Input = ({ label, id, type, required, register, errors, disabled, showPassword, handleShowPassword }: Props) => {
  return (
    <>
      <div className="">
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="relative mt-2">
          <input
            type={!showPassword ? type : 'text'}
            id={id}
            autoComplete={id}
            disabled={disabled}
            {...register(id, { required })}
            className={clsx(
              `form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
              errors[id] && `focus:ring-rose-500`,
              disabled && `opacity-50 cursor-default`
            )}
          />
          {type === 'password' && (
            <div onClick={handleShowPassword} className="absolute cursor-pointer top-2 right-2">
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
