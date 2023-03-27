'use client';

const NotificationsDropdown = () => {
  return (
    <>
      <div className="relative">
        <div
          id="dropdown"
          className="z-50 bg-black absolute top-9 right-0 text-base list-none divide-y divide-x rounded-lg shadow w-32 dark:bg-gray-700"
        >
          <ul aria-labelledby="dropdownButton" className="text-gray-100 py-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Item 1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Item 2
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NotificationsDropdown;
