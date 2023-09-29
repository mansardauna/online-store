import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiEdit, BiLogOut } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Userfeed = () => {
  const { t } = useTranslation(["layout"]);

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
    <div className='flex gap-4'>
      <div className='w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold'>
        {getInitials(userProfile.name)}
      </div>
      <div>
      <div className="my-3">
        <div>{userProfile.name}</div>
        <div> {userProfile.email}</div>
      </div>
      </div>
    </div>
  );
};

export default Userfeed;
