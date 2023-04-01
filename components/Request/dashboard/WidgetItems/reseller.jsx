'use clients';
import lotta from '../../../../public/bidstacker-lotta.png';
import Image from 'next/image';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const Reseller = () => {
  return (
    <>
      <section className="grow">
        <div>
          <div className="w-full min-h-min px-6 py-5 bg-white rounded-xl sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-semibold leading-none text-gray-800 dark:text-white">
                Senaste kontakter
              </h5>
            </div>

            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-block overflow-hidden rounded-full h-8 w-8">
                        <Image
                          src={lotta}
                          className="object-cover h-full w-full bg-gray-100"
                          alt="Profile image"
                          height={128}
                          width={128}
                        />
                      </div>{' '}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate dark:text-white">
                        El-Nisse
                      </p>
                      <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        elnisse@example.com
                      </p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-800 rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    >
                      <EnvelopeIcon className="h-6 w-6" />
                    </a>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-block overflow-hidden rounded-full h-8 w-8">
                        <Image
                          src={lotta}
                          className="object-cover h-full w-full bg-gray-100"
                          alt="Profile image"
                          height={128}
                          width={128}
                        />
                      </div>{' '}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate dark:text-white">
                        Byggmax Sverige AB
                      </p>
                      <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        email@byggmax.com
                      </p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-800 rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    >
                      <EnvelopeIcon className="h-6 w-6" />
                    </a>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex">
                      <div className="bg-gray-200 overflow-hidden rounded-full h-8 w-8">
                        <p className="text-xs mt-1">Logo</p>
                      </div>{' '}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate dark:text-white">
                        Michael Gough
                      </p>
                      <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-800 rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    >
                      <EnvelopeIcon className="h-6 w-6" />
                    </a>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-block overflow-hidden rounded-full h-8 w-8">
                        <Image
                          src={lotta}
                          className="object-cover h-full w-full bg-gray-100"
                          alt="Profile image"
                          height={128}
                          width={128}
                        />
                      </div>{' '}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate dark:text-white">
                        Lana Byrd
                      </p>
                      <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-800 rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    >
                      <EnvelopeIcon className="h-6 w-6" />
                    </a>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-block overflow-hidden rounded-full h-8 w-8">
                        <Image
                          src={lotta}
                          className="object-cover h-full w-full bg-gray-100"
                          alt="Profile image"
                          height={128}
                          width={128}
                        />
                      </div>{' '}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                      </p>
                      <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-800 rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    >
                      <EnvelopeIcon className="h-6 w-6" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reseller;
