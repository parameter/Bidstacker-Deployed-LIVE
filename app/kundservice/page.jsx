import React from 'react';
import TabsCustomerService from '@/components/StartPage/shared/TabsCustomerService';
import { Metadata } from 'next';

export const metadata = {
  title: 'BIDSTACKER | Få hjälp av vår kundservice',
  description: 'Vi hjälper dagligen företag att hitta rätt material och återförsäljare, vi kan därmed förebygga fler byggavbrott och göra fler nöjda. Vi strävar alltid efter att upprätthålla en god kundservice vilket märks genom maximal kundnöjdhet.'
};

const page = () => {
  return (
    <div className="bg-gray-light dark:bg-gray-dark text-black dark:text-white pt-[175px] pb-[100px] px-4">
      <h2 className="pb-[50px]">Kundservice</h2>
      <TabsCustomerService />
    </div>
  );
};

export default page;
