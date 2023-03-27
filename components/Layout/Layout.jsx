import Head from 'next/head';
import Footer from './Footer';
import Nav from './Nav';
import HeadComp from '@/components/Layout/Head';
import CookieConsent from '@/components/CookieConsent/cookieConsent';
import InjectedScripts from '@/components/CookieConsent/injectedScripts';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <HeadComp />
      </Head>
      <Nav />
      <main className="container grow bg-white">{children}</main>
      <Footer>
        
        <InjectedScripts />
        <h1>Ytrewq</h1>
      </Footer>
    </>
  );
};

export default Layout;
