'use client';
import lotta from '../../../../public/bidstacker-lotta.png';
import Image from 'next/image';

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export const ProjectTeam = () => {
  const [editMode, setEditMode] = useState(false);
  const [team, setTeam] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddItem = () => {
    setTeam([...team, '']);
  };

  const handleDeleteItem = (index) => {
    const newTeam = team.filter((item, i) => i !== index);
    setTeam(newTeam);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="w-full flex flex-col mobile:flex-row justify-between">
        {/* ANSVARIG */}
        <section className="w-full mobile:w-6/12">
          <div>
            <h3 className="flex justify-between items-center text-2xl font-semibold mt-4 mb-2">
              Ansvarig
            </h3>
            <div className="flex items-center space-x-4 p-4">
              <div className="flex-shrink-0">
                <div className="inline-block overflow-hidden rounded-md h-28 w-28">
                  <Image
                    src={lotta}
                    className="object-cover h-full w-full bg-gray-100"
                    alt="Profile image"
                    height={128}
                    width={128}
                  />
                </div>
              </div>
              <section>
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
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Lotta
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    lotta@lotta.com
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* BEHÖRIGA */}
        <section className="w-full mobile:w-6/12">
          <div>
            <h3 className="flex justify-between items-center text-2xl font-semibold mt-4 mb-2">
              Behöriga
            </h3>
          </div>
          <div className="font-light rounded-xl px-4 py-1 mb-4">
            <ul role="list">
              <li className="py-4 mobile:py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-block overflow-hidden rounded-md h-12 w-12">
                      <Image
                        src={lotta}
                        className="object-cover h-full w-full bg-gray-100"
                        alt="Profile image"
                        height={128}
                        width={128}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Me
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      lotta@lotta.com
                    </p>
                  </div>
                  <button
                    id="dropdownButton"
                    onClick={() => setShow(!show)}
                    data-dropdown-toggle="dropdown"
                    className="inline-block text-gray-500 hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
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
              </li>
              <li className="py-4 mobile:py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-block overflow-hidden rounded-md h-12 w-12">
                      <Image
                        src={lotta}
                        className="object-cover h-full w-full bg-gray-100"
                        alt="Profile image"
                        height={128}
                        width={128}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Lotta
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      lotta@lotta.com
                    </p>
                  </div>
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
              </li>
              <li className="py-4 mobile:py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-block overflow-hidden rounded-md h-12 w-12">
                      <Image
                        src={lotta}
                        className="object-cover h-full w-full bg-gray-100"
                        alt="Profile image"
                        height={128}
                        width={128}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Lotta
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      lotta@lotta.com
                    </p>
                  </div>
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
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};
