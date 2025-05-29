import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiEdit, BiLogOut } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserCard:React.FC = () => {
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
    <div className='h-80 bg-white rounded-md p-2 shadow-lg md:w-9/12 md:m-auto xl:w-full xl:m-0 flex gap-5 flex-col items-center text-center'>
      <div className='w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center mt-5 text-4xl font-bold'>
        {getInitials(userProfile.name)}
      </div>
      <div className="my-3">
        <div>{userProfile.name}</div>
        <div> {userProfile.email}</div>
      </div>
      <div className="flex gap-7">
        <Link to="/signin">
          <div className='flex items-center text-sm rounded-md px-4 cursor-pointer hover:bg-gray-800 bg-black p-1 text-white gap-2'>
            <BiLogOut />
            <div> {t("logout", { ns: "layout" })}</div>
          </div>
        </Link>
        <Link to="/coming">
          <div className='flex items-center  text-sm rounded-md px-4 cursor-pointer shadow-md p-1  gap-2'>
            <BiEdit />
            <div> {t("edit", { ns: "layout" })}</div>     </div>
        </Link>

      </div>

    </div>
  );
};

export default UserCard;
