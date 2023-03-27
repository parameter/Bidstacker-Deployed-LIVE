import { React } from 'react';
import { SignUp } from '@/page-components/Auth';

export default function SubAccountsComponent() {

    return <>
        <SignUp role="requestor" subAccount="true" />
    </>
}
