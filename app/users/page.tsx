import React, { useEffect } from 'react';
import EmptyState from '../components/EmptyState';

interface UserProps {
}
export default function User({}: UserProps) {

  return (
    <>
      <div className="hidden h-full lg:block lg:pl-80">
        <EmptyState />
      </div>
    </>
  );
}
