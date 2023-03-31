'use client';

import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import MailIcon from '../../../public/assets/svg/MailIcon';
import PhoneIcon from '../../../public/assets/svg/PhoneIcon';
import FormInput from '@/components/StartPage/forms/FormInput';
import FormTextarea from '@/components/StartPage/forms/FormTextarea';
import ThankYouNotice from '@/components/ThankYouNotice/ThankYouNotice';
import general_settings from '@/content-json/general-settings-json';

const ContactForm = () => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [buyer, setBuyer] = useState(false);
  const [reseller, setReseller] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [message, setMessage] = useState('');
  const [characterLimit] = useState(30);
  const [terms, setTerms] = useState(false);
  const [sending, setSending] = useState(undefined);

  // Form validation state
  const [errors, setErrors] = useState({});

  // Setting button text on form submission
  const [buttonText, setButtonText] = useState('Skicka');

  // Setting success or failure messages states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
 
  // Validation check method
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (email.length <= 0) {
      tempErrors['email'] = true;
      isValid = false;
    }

    if (message.length <= 0) {
      tempErrors['message'] = true;
      isValid = false;
    }

    if (!terms) {
      tempErrors['terms'] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log('errors', errors);
    return isValid;
  };

  const handleOnChange = (e) => {
    if (e.target.name === 'buyer') {
      setBuyer(!buyer);
    }
    if (e.target.name === 'reseller') {
      setReseller(!reseller);
    }
    if (e.target.name === 'delivery') {
      setDelivery(!delivery);
    }

    if (e.target.name === 'terms') {
      setTerms(!terms);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText('Skickar');

      var result = await axios.post('/api/contact-form-mail', {
        businessName: businessName,
        email: email,
        buyer: buyer,
        reseller: reseller,
        delivery: delivery,
        message: message
      });

      if (!result) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText('Skicka');
        return;
      }

      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText('Skicka');

      // Reset form fields
      setBusinessName('');
      setEmail('');
      setBuyer(false);
      setReseller(false);
      setDelivery(false);
      setMessage('');
      setTerms(false);
      setSending(false);
    }
    
  };

  return (
    <>
      <ThankYouNotice sending={sending} content={general_settings.formFeedback.contact} />

      <div className="bg-gray-light dark:bg-gray-dark text-black dark:text-white pt-[175px] pb-[100px] px-4">
        <h2 className="pb-[50px]">Kontakta oss</h2>
        <div className="max-w-[900px] mx-auto flex flex-col desktop:flex-row gap-4">
          <div className="grow mx-2 bg-white dark:bg-gray-light-dark rounded-xl">
            <p className="px-8 pt-8 mb-5 leading-relaxed tracking-normal">
              Välkommen att höra av dig till oss vid frågor. Du hittar även
              många svar under{' '}
              <Link href="/kundservice">
                <span className="link link-yellow">vanliga frågor</span>
              </Link>
              . Övriga frågor? Mejla oss!
            </p>
            <div className="flex flex-col gap-5 px-7 desktop:gap-0 desktop:px-0 desktop:flex-row desktop:justify-around my-8">
              <div className="flex gap-2 items-center">
                <MailIcon className="w-5 h-5 text-yellow" />
                <p className="link link-yellow inline-block cursor-pointer">
                  {general_settings.email}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <PhoneIcon className="w-5 h-5 text-yellow" />
                <p className="link link-yellow inline-block cursor-pointer">
                  {general_settings.telephone}
                </p>
              </div>
            </div>
            <p className="mx-7 mb-8 leading-relaxed tracking-normal">
              Öppettider: måndag-fredag 9-17. Lunchstängt 12-13.
            </p>
            <h3 className="mx-7 mb-6">Skicka ett meddelande till oss</h3>
            <form className="relative" onSubmit={handleSubmit}>
              <div style={{display: (sending ? 'block' : 'none')}} className="animated_barberpole"></div>
              <div className="mb-6 px-6">
                <FormInput
                  label="Företagsnamn"
                  value={businessName}
                  name="businessName"
                  type="text"
                  onChange={(e) => setBusinessName(e.target.value)}
                  maxLength={50}
                />
              </div>
              <div className="mb-6 px-6">
                <FormInput
                  label="Epost *"
                  value={email}
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={50}
                />
                {errors?.email && email.length <= 0 && (
                  <p className="text-red-500 text-[14px] mx-2 mt-1">
                    Fyll i din epost adress.
                  </p>
                )}
              </div>
              <div className="px-7 mb-6">
                <h3 className="mb-4">Jag kontakter er som</h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 mobile:flex mb-2">
                  <li className="w-full mb-4">
                    <div className="flex items-center pl-3">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-current border-0 rounded-md focus:ring-0"
                          name="buyer"
                          checked={buyer}
                          onChange={handleOnChange}
                        />
                        <span className="ml-2">Inköpare</span>
                      </label>
                    </div>
                  </li>
                  <li className="w-full mb-4">
                    <div className="flex items-center pl-3">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-current border-0 rounded-md focus:ring-0"
                          name="reseller"
                          checked={reseller}
                          onChange={handleOnChange}
                        />
                        <span className="ml-2">Återförsäljare</span>
                      </label>
                    </div>
                  </li>
                  <li className="w-full mb-4">
                    <div className="flex items-center pl-3">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-current border-0 rounded-md focus:ring-0"
                          name="delivery"
                          checked={delivery}
                          onChange={handleOnChange}
                        />
                        <span className="ml-2">Åkare</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative px-6 mb-4">
                <FormTextarea
                  value={message}
                  name="message"
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  rows="5"
                  maxLength={1000}
                  placeholder="Meddelande *"
                  className="h-[100px] placeholder:text-sm placeholder:text-black block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F9B300] peer"
                />
                {errors?.message && message.length <= 0 && (
                  <p className="absolute -bottom-2 left-0 text-red-500 text-[14px] mx-8">
                    Skriv ditt meddelande.
                  </p>
                )}
                <p className="text-right text-gray-500 text-sm mt-1 mr-1">
                  {message.length} / 1000
                </p>
              </div>
              <div className="px-7">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-current border-0 rounded-md focus:ring-0"
                    name="terms"
                    checked={terms}
                    onChange={handleOnChange}
                  />
                  <Link className="underline" href="/villkor/anvandarvillkor">
                    <p className="ml-4 text-[14px] text-gray-500">
                      Jag har tagit del av{' '}
                      <span className="link link-yellow">
                        Bidstackers användarvillkor
                      </span>{' '}
                    </p>
                  </Link>
                </label>
              </div>
              {errors?.terms && terms === false && (
                <p className="text-red-500 text-[14px] px-8 mt-1">
                  Du måste godkänna Bidstackers användarvillkor.
                </p>
              )}

              <div className="my-8">
                <button type="submit" className="btn btn-yellow px-8 py-4 ml-6">
                  {buttonText}
                </button>
                <div className="mx-7">
                  {showSuccessMessage && (
                    <p className="text-[#F9B300] font-semibold text-sm desktop:text-xl mt-4">
                      Tack! Ditt meddelande har levererats.
                    </p>
                  )}
                  {showFailureMessage && (
                    <p className="text-red-500 mt-4">
                      Hoppsan! Något gick fel, försök igen.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
          {/*
          <div className="mx-2 flex flex-col gap-4">
            <div className="bg-white dark:bg-gray-light-dark px-8 py-8 desktop:flex-none flex flex-col justify-center pl-5 desktop:w-[350px] rounded-xl">
              <h3 className="text-xl font-bold">Bidstacker</h3>
              <p className="mb-2">556677-8899</p>
              <p className="leading-relaxed tracking-normal">Adressvägen 99</p>
              <p className="leading-relaxed tracking-normal">
                110 10 Stockholm
              </p>
            </div>
            
          </div>
          */}
        </div>
      </div>
    </>
  );
};

export default ContactForm;
