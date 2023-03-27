'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import LinkIcon from 'public/assets/svg/LinkIcon';
import LoginIcon from 'public/assets/svg/LoginIcon';
import { useCurrentUser } from '@/lib/user';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import UserHat from 'public/assets/svg/UserHat';
import { useRouter } from 'next/navigation';

const MobileFooter = () => {
  const { data: { user } = {}, mutate } = useCurrentUser();
  const [visible, setVisible] = useState(false);
  const menuRef = useRef();
  const avatarRef = useRef();
  const router = useRouter();

  useEffect(() => {
    // detect outside click to close menu

    const onMouseDown = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  const onSignOut = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE',
      });
      toast.success('You have been signed out');
      mutate({ user: null });
      router.push('/');
    } catch (e) {
      toast.error(e.message);
    }
  }, [mutate, router]);

  return (
    <div className="w-full bg-white shadow dark:bg-gray-light-dark text-gray-light-dark dark:text-gray-100 fixed bottom-0 right-0 py-2 px-10 z-30 fixed--help-right flex justify-between">
      <div className="flex flex-col">
        <LinkIcon className="h-6" />
        <p className="font-bold text-sm">Anslut</p>
      </div>
      <div className="flex flex-col ">
        {!user ? (
          <Link href="/login" className="flex flex-col">
            <LoginIcon className="h-6 font-bold" />
            <p className="font-bold text-sm">Logga in</p>
          </Link>
        ) : (
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => setVisible(!visible)}
            ref={avatarRef}
          >
            <UserHat className="h-6" />
            <p className="font-bold text-sm">
              {user.name ? user.name : 'Okänd'}
            </p>

            {visible && (
              <div
                className="bg-white dark:bg-gray-dark shadow-xl w-[220px] absolute -top-[97px] right-0 z-40 rounded-lg"
                ref={menuRef}
              >
                <div className="bg-white dark:bg-gray-dark hover:bg-gray-lighter dark:hover:bg-gray-light-dark transition duration-300 flex items-center gap-3 py-3 pl-3">
                  <UserHat className="h-3" />
                  Profil-inställningar
                </div>
                <div
                  className="bg-white dark:bg-gray-dark hover:bg-gray-lighter dark:hover:bg-gray-light-dark transition duration-300 flex items-center gap-3 py-3 pl-3 border-t border-gray-100"
                  onClick={onSignOut}
                >
                  <LoginIcon className="h-3" />
                  Logga ut
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFooter;
