'use client';
import lotta from '../../../../public/bidstacker-lotta.png';
import Image from 'next/image';
import {
  EnvelopeIcon,
  UserPlusIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

import ProfileDropdown from './profile-edit-dropdown';
import { useState } from 'react';

const Card = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl flex justify-between gap-2 px-4 mobile:px-10">
      <main className="w-full flex-1 text-left">
        <section className="flex justify-between text-left">
          <figure className="min-w-lg bg-white rounded-lg dark:bg-gray-800 px-4 pt-4">
            <div className="mb-2 px-2">
              <div className="flex justify-between items-center relative">
                <h6 className="text-orange font-bold">My Bidstacker Profile</h6>
                <div className="dropdown-wrapper">
                  <button
                    id="dropdownButton"
                    onClick={() => setShow(!show)}
                    data-dropdown-toggle="dropdown"
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button"
                  >
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                  </button>
                </div>
                {show && <ProfileDropdown />}
              </div>
            </div>

            <div className="flex items-center ml-4">
              <div className="inline-block overflow-hidden rounded-full h-24 w-24">
                <Image
                  src={lotta}
                  className="object-cover h-full w-full bg-gray-100"
                  alt="Profile image"
                  height={128}
                  width={128}
                />
              </div>
              <div className="flex flex-col ml-6">
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Lotta
                </h5>
                <span className="text-sm text-gray-400 dark:text-gray-400">
                  Byggare
                </span>
              </div>
            </div>
            <div className="w-full mt-4 px-4">
              <h2 className="text-sm font-bold text-left mb-2">
                Personal statistics
              </h2>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <p className="text-gray-600 text-sm">Company</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Lottas Bygg</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Team</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Project Development</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Job Title</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Senior Engineer</p>
                </div>
                <div>
                  <p className="text-gray text-sm-600 text-sm">Start Date</p>
                </div>
                <div>
                  <p className="font-medium text-sm">January 2020</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mobile:mt-6 mb-4">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                <UserPlusIcon className="h-6 w-6 mr-2" />
                Add
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                <EnvelopeIcon className="h-6 w-6 mr-2" />
                Message
              </a>
            </div>
          </figure>
        </section>
      </main>
    </div>
  );
};

export default Card;
