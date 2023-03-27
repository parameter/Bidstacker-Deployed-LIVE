'use client';
import {
  BellIcon,
  UserIcon,
  UsersIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import NotificationsDropdown from './Notifications/notifications-dropdown';

const Header = ({ params }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex justify-between mr-auto ml-auto pt-8 pb-4 mt-16">
      <div className="flex flex-col">
        <Link className="cursor-pointer" href={`/management/request/dashboard`}>
          <h2 className="hover:hover-test text-xl mobile:text-2xl font-semibold text-gray-800 text-left">
            Dashboard
          </h2>
        </Link>
        <section className="flex items-end">
          <h6 className="text-sm">
            Inköp&nbsp;/
            {params === undefined
              ? null
              : (params[0] === 'projects' && (
                  <>
                    <span>&nbsp;{'Projekt'}</span>
                  </>
                )) ||
                (params[0] === 'team' && (
                  <>
                    <span>&nbsp;{'Team'}</span>
                  </>
                )) ||
                (params[0] === 'profile' && (
                  <>
                    <span>&nbsp;{'Profil'}</span>
                  </>
                ))}
          </h6>
        </section>
        <p className="text-sm"></p>
      </div>
      <div className="flex items-center">
        <div className="flex gap-4">
          <div className="flex flex-col items-center relative cursor-pointer hover:underline">
            <InformationCircleIcon className="h-6 w-6 text-gray-500 stroke-2" />
            <p className="text-xs text-gray-500 hover:underline">Info</p>
          </div>
          <Link
            className="cursor-pointer"
            href={`/management/request/dashboard/profile`}
          >
            <div className="flex flex-col items-center relative cursor-pointer hover:underline">
              <UserIcon className="h-6 w-6 text-gray-500 stroke-2" />
              <p className="text-xs text-gray-500 hover:underline">Profil</p>
            </div>
          </Link>

          <Link
            className="cursor-pointer"
            href={`/management/request/dashboard/team`}
          >
            <div className="flex flex-col items-center relative cursor-pointer hover:underline">
              <UsersIcon className="h-6 w-6 text-gray-500 stroke-2" />
              <p className="text-xs text-gray-500">Team</p>
            </div>
          </Link>

          {showNotifications && <NotificationsDropdown />}

          <button onClick={() => setShowNotifications(!showNotifications)}>
            <div className="flex flex-col items-center relative cursor-pointer hover:underline">
              <span className="absolute -left-[-10px] -top-[-2px] bg-[#ffb4b4] h-[6px] w-[6px] p-[5px] rounded-[12px]"></span>
              <BellIcon className="h-6 w-6 text-gray-500 stroke-2" />
              <p className="text-xs text-gray-500">Notiser</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
