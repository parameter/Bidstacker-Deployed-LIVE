import { Login } from '@/page-components/Auth';
import Head from 'next/head';

const LoginPage = ({ params }) => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login params={params} />
    </>
  );
};

export default LoginPage;
