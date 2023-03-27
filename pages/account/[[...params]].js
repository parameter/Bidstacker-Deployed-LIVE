import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from 'context/app-context';
import { useEffect } from 'react';

export default function Settings({ params }) {
  const router = useRouter();
  const { newNotice } = useAppContext();

  useEffect(() => {
    if (!router.query.params) { return; }
    newNotice('Here is a notice for you ' + router.query.params[0]);
  },[router.query.params, newNotice]);

  return (
    <>
        <div className="container mx-auto mobile:px-6 mt-10">
            <ul>
                <li><Link href="/account/xxx" shallow >1</Link></li>
                <li><Link href="/account/2" shallow >2</Link></li>
                <li><Link href="/account/3" shallow >3</Link></li>
            </ul>
            <p>HEJ </p>
        </div>
    </>
  );
};