'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import FormInput from '../forms/FormInput';
import StepGuide from './StepGuide';
import saveAccountApplication from '@/lib/save-account-application';
import ThankYouNotice from '@/components/ThankYouNotice/ThankYouNotice';
import general_settings from '@/content-json/general-settings-json';

const Hero = ({ hero }) => {
  const [userEmail, setUserEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [terms, setTerms] = useState(false);
  const [sending, setSending] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    const target = event.target;
    var result = await saveAccountApplication({
      email: target.email.value,
      businessName: target.businessName.value,
      contactNumber: target.contactNumber.value,
      contactName: target.contactName.value,
      role: hero.userRole
    });
    console.log('result2',result);
    setSending(false);
  }

  /* <div
        className={
          'absolute left-0 top-0 w-full h-full z-20 opacity-95 ' + hero.bg
        }
      ></div>
      <div
        style={{
          backgroundImage: 'url(/assets/img/bg-buyer.webp)',
          backgroundPosition: 'cover',
          backgroundAttachment: 'fixed',
        }}
        className={'absolute left-0 top-0 w-full h-full'}
      ></div> */
   
  return (<>

    <ThankYouNotice sending={sending} content={general_settings.formFeedback.account} />

    <div className={`bg-[url('/assets/img/bg-buyer.webp')] bg-cover bg-fixed`}>
      <div
        style={{ backgroundColor: hero.bg }}
        className="relative dark:bg-gray-dark w-full pt-[180px] tablet:pt-[120px] pb-[100px] px-8 flex flex-col justify-items-center"
      >
        <div className="container relative mx-auto">
          <h1
            className={
              hero.textColor
                ? 'mb-1 text-start tablet:px-10 text-' + hero.textColor
                : 'mb-1 text-start tablet:px-10'
            }
          >
            {hero.title}
          </h1>
          <h3
            className={
              hero.textColor
                ? 'text-lg tablet:text-2xl text-start mb-[50px] px-0 tablet:px-10 mt-4 text-' +
                  hero.textColor
                : 'text-lg tablet:text-2xl text-start mb-[50px] px-0 tablet:px-10 mt-4'
            }
          >
            {hero.subTitle}
          </h3>
        </div>
        <div className="flex flex-col desktop:flex-row justify-center items-center ml-6 gap-6">
          <div className="order-last desktop:order-first w-full max-w-[600px]">
            <div className="relative max-w-[600px] mx-auto bg-white dark:bg-gray-light-dark rounded-xl mb-[80px]">
              <div style={{display: (sending ? 'block' : 'none')}} className="animated_barberpole"></div>
              <h3 className="px-6 py-10 font-bold">Ansök om konto</h3>
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
                <div className="text-right">
                  <button
                    type="submit"
                    className="w-full h-[60px] bg-green-cta rounded-b-lg mt-10 text-white text-lg font-bold uppercase"
                  >
                    {sending == true ? <>Skickar</> : <>Ansök</>}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className={
              hero.textColor
                ? 'w-full max-w-[600px] flex items-center justify-center text-' +
                  hero.textColor
                : 'w-full max-w-[600px] flex items-center justify-center'
            }
          >
            <StepGuide
              textColor={hero.textColor}
              stepGuide={hero.stepGuide}
              svgImage={hero.svgImage}
            />
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Hero;
