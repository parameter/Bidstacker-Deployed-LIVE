import Nav from '@/components/Layout/Nav';
import { AppProvider } from 'context/app-context';
import { RequestProvider } from 'context/request-context';
import { SupplierProvider } from 'context/supplier-context';
import '@/styles/globals.css';

export default function PagesApp({ Component, pageProps }) {

  console.log('This is here 1');

  return (<>
     <Nav />
     <Component {...pageProps} />
  </>);
}
