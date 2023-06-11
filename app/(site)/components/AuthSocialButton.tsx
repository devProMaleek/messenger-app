import React from 'react';
import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  onClick: () => void;
};

const AuthSocialButton = ({ icon: Icon, onClick }: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex justify-center w-full px-4 py-2 text-gray-500 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-1"
      >
        <Icon size={26} />
      </button>
    </>
  );
};

export default AuthSocialButton;
