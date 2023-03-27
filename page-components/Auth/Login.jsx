'use client';

import LoaderButton from '@/components/Button/LoaderButton';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  useEffect(() => {
    if (isValidating) return;
  }, [user, isValidating]);

  const onSubmit = useCallback(
    async (event) => {
      setIsLoading(true);
      event.preventDefault();
      try {
        const response = await fetcher('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        });
        mutate({ user: response.user }, false);
        toast.success('You have been logged in.');
        router.push('/management');
      } catch (e) {
        console.log(e);
        toast.error('Incorrect email or password.');
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <div className="bg-gray-light dark:bg-gray-dark text-black dark:text-white pt-[175px] justify-center pb-[100px] px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="pb-[50px]">Logga in</h2>
        <div className="mx-2 bg-white dark:bg-gray-light-dark rounded-xl p-6 tablet:p-10">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col">
              <div className="mb-3">
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Epost*"
                  autoComplete="email"
                  label="Email"
                  className="bg-white form-control block w-full px-4 py-2 text-xl font-normal text-black dark:text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Lösenord*"
                  autoComplete="current-password"
                  label="Lösenord"
                  className="bg-white form-control block w-full px-4 py-2 text-xl font-normal text-black dark:text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end mb-6 text-gray-700">
                <Link
                  href="/forget-password"
                  passHref
                  className="link link-yellow"
                >
                  Glömt lösenord?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center btn btn-yellow py-4 text-lg mb-2"
            >
              {isLoading && <LoaderButton />}
              Logga in
            </button>
          </form>
          <div className="flex justify-start text-gray-700">
            Inget konto?
            <Link
              href="/sign-up"
              passHref
              className="link link-yellow text-yellow-900 ml-1"
            >
              Skapa konto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
