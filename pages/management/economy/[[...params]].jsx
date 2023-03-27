'use client';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ListOfCases from '@/components/Economy/list-of-cases';
import FormOfPay from '@/components/Economy/pay-form';
import compileMyCases from '@/lib/economy/compileMyCases';

export default function UserEconomyComponent() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [myCases, setMyCases] = useState({});

  useEffect(() => {
    if (Object.keys(myCases || {}).length) {
      return;
    }
    getMyCases();
  }, [myCases]);

  const getMyCases = async () => {
    var cases = await axios.get('/api/economy/myCases');
    if (cases.data) {
      setMyCases(compileMyCases(cases.data));
    }
  };

  const findCase = () => {
    return myCases[
      Object.keys(myCases || {}).find(
        (groupId) => myCases[groupId].groupId === router.query.params[0]
      )
    ];
  };

  return (
    <>
      <div className="w-full bg-gray-100 px-4 py-10 mt-20">
        <div className="max-w-[800px] bg-white rounded-xl py-10 px-10 mr-auto ml-auto">
          {!router.query.params ? (
            <ListOfCases cases={myCases} />
          ) : (
            <FormOfPay _case={findCase()} />
          )}
        </div>
      </div>
    </>
  );
}
