'use client';

import LoaderButton from '@/components/Button/LoaderButton';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';


const SignUp = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();

  const { mutate } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await fetcher('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
            username: usernameRef.current.value,
            role: props.role,
            subaccount: props.subAccount,
          }),
        });
        mutate({ user: response.user }, false);
        toast.success('Your account has been created');
        // router.replace('/feed');
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  const welcome = {
    requestor: 'Registrera som inköpare',
    supplior: 'Registrera som leverantör',
    deliveror: 'Registrera som bud',
    'sub-account': 'Regga ett underkonto dårå',
  };

  return (
    <div className="bg-gray-light dark:bg-gray-dark text-black dark:text-white pt-[175px] justify-center pb-[100px] px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="pb-[50px]">Skapa Konto</h2>
        <div className="mx-2 bg-white dark:bg-gray-light-dark rounded-xl p-6 tablet:p-10">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <input
                ref={emailRef}
                type="email"
                placeholder="Epost*"
                label="Email"
                className="bg-white  form-control block w-full px-4 py-2 text-xl font-normal text-black dark:text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                autocomplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <input
                ref={passwordRef}
                type="password"
                placeholder="Lösenord*"
                label="Lösenord"
                className="bg-white form-control block w-full px-4 py-2 text-xl font-normal text-black dark:text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required
              />
            </div>
            <div className="mb-3">
              <input
                ref={usernameRef}
                placeholder="Användarnamn*"
                label="Användarnamn"
                className="bg-white form-control block w-full px-4 py-2 text-xl font-normal text-black dark:text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required
              />
            </div>
            <div className="mb-3">
              <input
                ref={nameRef}
                placeholder="Ditt namn"
                label="Ditt namn"
                className="bg-white form-control block w-full px-4 py-2 text-xl font-normal text-black dark:text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center btn btn-yellow py-4 text-lg mb-2"
            >
              {isLoading && <LoaderButton />}
              Skapa konto
            </button>
          </form>
          <div>
            Redan konto?
            <Link
              href="/login"
              passHref
              className="link link-yellow text-yellow-900 ml-1"
            >
              Logga in?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
