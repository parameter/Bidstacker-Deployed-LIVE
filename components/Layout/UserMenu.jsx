"use client";
import { Avatar } from '@/components/Avatar';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { fetcher } from '@/lib/fetch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Container from './Container';
import Spacer from './Spacer';
import { useCurrentUser } from '@/lib/user';
 
const UserMenu = ({ color }) => {
    const menuRef = useRef();
    const avatarRef = useRef();
    const { data: { user } = {}, mutate } = useCurrentUser();
  
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      // detect outside click to close menu
      const onMouseDown = (event) => {
        if (
          !menuRef.current.contains(event.target) &&
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
        var res = await fetcher('/api/auth', {
          method: 'DELETE',
        });
        toast.success('You have been signed out');
        mutate({ user: null });
        router.push('/');
      } catch (e) {
        toast.error(e.message);
      }
    }, [mutate]);
  
    return (
      <div className="hidden desktop:block">
        
          <button  className="" ref={avatarRef} onClick={() => setVisible(!visible)}>
            <div className="bg-white w-[40px] h-[40px] rounded-full"></div>
          </button>
          
        <div ref={menuRef} role="menu" aria-hidden={visible} className="absolute">
          {visible && (
            <div className="flex flex-col p-5 bg-white">
              <Link className="text-black" passHref href="/management/economy">
                Ekonomi
              </Link>
              <button onClick={onSignOut} className="text-black">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    );
};

export default UserMenu