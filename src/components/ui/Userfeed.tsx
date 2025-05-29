import React from 'react';
import { useSelector } from 'react-redux';

const Userfeed:React.FC = () => {

  const userProfile = useSelector((state) => state.auth.userProfile);

  if (!userProfile) {
    return <div>User is not logged in.</div>;
  }

  const getInitials = (name) => {
    const words = name.split(' ');
    const initials = words.map((word) => word[0]);
    return initials.join('').toUpperCase();
  };

  return (
    <div className='flex gap-4 items-center'>
      <div className='w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold'>
        {getInitials(userProfile.name)}
      </div>
      <div>
      <div className="my-3">
        <div className=' font-semibold'>{userProfile.name}</div>
        <div className='text-gray-300'> {userProfile.email}</div>
      </div>
      </div>
    </div>
  );
};

export default Userfeed;
