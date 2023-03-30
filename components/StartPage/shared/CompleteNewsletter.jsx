'use client';

import Link from 'next/link';
import { useState } from 'react';
import FormInput from '../forms/FormInput';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import ThankYouNotice from '@/components/ThankYouNotice/ThankYouNotice';
import general_settings from '@/content-json/general-settings-json';

const CompleteNewsletter = () => {
  const searchParams = useSearchParams();
  const [sending, setSending] = useState(undefined);
  const [userEmail, setUserEmail] = useState(searchParams.get('email') || '');
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactName, setContactName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);

    var result = await axios({
      method: 'POST',
      url: '/api/contact-to-mailchimp',
      data: {
        email_address: userEmail,
        businessName: businessName,
        contactNumber: contactNumber,
        contactName: contactName,
      },
    });

    if (result.data.status === 'subscribed') {
      setTimeout(() => {
        setSending(false);
      },500);
    }
    if (result.data.status === 'failed') {
      setTimeout(() => {
        setSending(false);
      },500);
    }
  };
 
  return (<>

    <ThankYouNotice sending={sending} content={general_settings.formFeedback.newsletter} />
  
    <div className="bg-gray-light dark:bg-gray-dark text-black dark:text-white pt-[175px] pb-[100px] px-4">
      <h2 className="pb-[50px]">Nyhetsbrev</h2>
      <div className="relative max-w-[600px] mx-auto bg-white dark:bg-gray-light-dark rounded-xl mb-[80px]">
        <div style={{display: (sending ? 'block' : 'none')}} className="animated_barberpole"></div>
        <h3 className="px-6 py-10">Följ oss och få nyheter direkt!</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-8 px-6">
            <FormInput
              label="Epost"
              errorMessage="Ange epost."
              value={userEmail}
              name="email"
              type="email"
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              required={true}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="mb-8 px-6">
            <FormInput
              label="Företagsnamn"
              errorMessage="Ange företagetsnamn."
              value={businessName}
              name="businessName"
              type="text"
              pattern="^[A-ZÜÄÖÅa-züäöå0-9 -]{2,60}$"
              required={true}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div className="mb-8 px-6">
            <FormInput
              label="Telefon"
              errorMessage="Ange telefon."
              value={contactNumber}
              name="contactNumber"
              type="text"
              pattern="^[0-9+-]{6,20}$"
              required={true}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div className="mb-8 px-6">
            <FormInput
              label="Kontaktperson"
              errorMessage="Ange namn."
              value={contactName}
              name="contactName"
              type="text"
              pattern="^[A-ZÜÄÖÅa-züäöå ]{2,40}$"
              required={true}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 mb-3 ml-2 px-6">
            <input type="checkbox" required />
            <Link className="underline" href="/villkor/anvandarvillkor">
              <span className="text-gray-700 text-sm">
                Jag godkänner Bidstackers användarvillkor.
              </span>
            </Link>
          </div>
          <div className="relative text-right">
            <button
              type="submit"
              className="w-full h-[60px] bg-yellow rounded-b-lg mt-10 text-white text-lg font-bold uppercase"
            >
              {sending == true ? <>Sending</> : <>Följ Oss!</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  </>);
};

export default CompleteNewsletter;
