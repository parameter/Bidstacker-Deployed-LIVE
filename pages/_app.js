import Nav from '@/components/Layout/Nav';
import { AppProvider } from 'context/app-context';
import { RequestProvider } from 'context/request-context';
import { SupplierProvider } from 'context/supplier-context';
import '@/styles/globals.css';

export default function PagesApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <RequestProvider>
        <SupplierProvider>
          <Nav />
          <Component {...pageProps} />
        </SupplierProvider>
      </RequestProvider>
    </AppProvider>
  );
}
