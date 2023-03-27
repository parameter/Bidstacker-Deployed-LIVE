'use client';
const ProfileDropdown = () => {
  return (
    <>
      <div
        id="dropdown"
        className="z-50 absolute top-9 right-0 text-base list-none bg-gray-100 divide-y divide-x rounded-lg shadow w-32 dark:bg-gray-700"
      >
        <ul className="py-2" aria-labelledby="dropdownButton">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Edit
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileDropdown;
