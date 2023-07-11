'use client';
import React, { useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

type Props = {
  href: string;
  label: string;
  icon: IconType;
  isActive?: boolean;
  onClick?: () => void;
};

const DesktopItem = ({ href, label, icon: Icon, isActive, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <>
      <li onClick={handleClick} className="">
        <Link
          href={href}
          className={clsx(
            `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
            isActive && `bg-gray-100 text-black`
          )}
        >
          <Icon className={clsx('w-6 h-6 shrink-0', isActive && 'text-sky-500')} />
          <span className="sr-only">{label}</span>
        </Link>
      </li>
    </>
  );
};

export default DesktopItem;
