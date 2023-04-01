"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from 'context/app-context';
import Cookies from 'js-cookie';

const CookieConsent = () => {
    const [initiated, setInitiated] = useState(false);
    const [open, setOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { setAnalyticsAllowed, setHotjarAllowed, analyticsAllowed, hotjarAllowed } = useAppContext();
    const analyticsRef = useRef();
    const hotjarRef = useRef();

    useEffect(() => {
        if (initiated) { return; }

        const cookiebarClosed = Cookies.get('cookiebar-closed');

        if (cookiebarClosed === 'false' || typeof cookiebarClosed === 'undefined') {
            setOpen(true);
        }

        setInitiated(true);

    },[open, initiated, setInitiated]);

    useEffect(() => {
        if (!analyticsRef.current || !hotjarRef.current) {
            return;
        }
        analyticsRef.current.checked = (Cookies.get('analytics-allowed') === 'true');
        hotjarRef.current.checked = (Cookies.get('hotjar-allowed') === 'true');
    },[]);

    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    const handleAnalyticsConsent = (event) => {
        setAnalyticsAllowed(event.target.checked);
        // setCookie('analytics-allowed', event.target.checked, 60);
        Cookies.set('analytics-allowed', (event.target.checked ? 'true' : 'false'), { expires: 60 });
    }

    const handleHotjarConsent = (event) => {
        setHotjarAllowed(event.target.checked);
        // setCookie('hotjar-allowed', event.target.checked, 60);
        Cookies.set('hotjar-allowed', (event.target.checked ? 'true' : 'false'), { expires: 60 });
    }
 
    const closeBar = (event) => {
        // setCookie('cookiebar-closed', true, 60);
        Cookies.set('cookiebar-closed', (event.target.checked ? 'true' : 'false'), { expires: 60 });
        setOpen(false);
    }

    const openBar = (event) => {
        // setCookie('cookiebar-closed', false, 60);
        Cookies.set('cookiebar-closed', (event.target.checked ? 'true' : 'false'), { expires: 60 });
        setOpen(true);
    }

    const openSettings = () => {
        setSettingsOpen(true);
    }

    const acceptAll = () => {
        setAnalyticsAllowed(true);
        setHotjarAllowed(true);

        Cookies.set('analytics-allowed', 'true', { expires: 60 });
        Cookies.set('hotjar-allowed', 'true', { expires: 60 });
        Cookies.set('cookiebar-allowed', 'true', { expires: 60 });

        setTimeout(() => {
            setOpen(false);
        },900);
    }

    const denyAll = () => {
        setAnalyticsAllowed(false);
        setHotjarAllowed(false);

        Cookies.set('analytics-allowed', 'false', { expires: 60 });
        Cookies.set('hotjar-allowed', 'false', { expires: 60 });
        Cookies.set('cookiebar-allowed', 'false', { expires: 60 });

        setTimeout(() => {
            setOpen(false);
        },900);
    }

    const anpassaKakor = () => {
        setSettingsOpen(true);
    }
  
    return <>
     {open === true ?  
        <div className="fixed bottom-0 left-0 pt-6 desktop:pr-28 pb-6 px-2 tablet:px-6 bg-white w-full z-40 flex flex-col justify-items-center">
            {settingsOpen === false ? 
                <p className="mr-6 mb-2">🍪&nbsp;Godkänn gärna våra kakor</p>
            : 
                <p onClick={() => {
                    setSettingsOpen(false);
                }} className="mr-6 mb-2">Stäng inställningar</p>
            }
            
            <div className={"flex flex-col tablet:flex-row " + (settingsOpen === true ? 'hidden' : '')}>
                <div className="flex flex-col tablet:pr-4">
                    <p className="leading-5">
                        Vi använder &apos;cookies&apos; för att förbättra användarupplevelsen och innehållet. Användaren kan välja att acceptera alla eller enbart vissa cookies. Ändringar görs i inställningarna nedan.
                    </p>
                    <p className="my-4 text-sm">ANALYTICS | SPÅRNING&nbsp;AV&nbsp;KONVERTERING | SESSION&nbsp;REPLAY</p>
                    <p onClick={openSettings} className="underline cursor-pointer">
                        <span className="mr-6">Inställningarna</span> 
                        <a href="/villkor/integritetspolicy">Integritetspolicy</a>
                    </p>
                </div>
                <div className="mt-4 tablet:pl-4 tablet:pr-8">

                    <button onClick={anpassaKakor} className="rounded-full border-2 text-sm px-5 py-2.5 text-center font-bold btn whitespace-nowrap mr-4 focus:bg-green-cta focus:text-white" type="button">Anpassa</button>
                    <button onClick={acceptAll} className="rounded-full border-2 text-sm px-5 mb-2 py-2.5 text-center font-bold btn whitespace-nowrap mr-4 bg-[#CCF8CF] border-green-cta focus:bg-green-cta focus:text-white" type="button">Acceptera alla</button>
                    
                </div>
            </div>
            
            <div className={"flex flex-col tablet:flex-row " + (settingsOpen === true ? '' : 'hidden')}>
                <div className="flex flex-col">
                    <div className="block mt-4 mr-6 w-full tablet:w-1/2">
                        <label className="toggler-wrapper style-3">
                            <input checked={analyticsAllowed} ref={analyticsRef} onChange={(event) => handleAnalyticsConsent(event)} name="allow-analytics" type="checkbox" />
                            <div className="toggler-slider">
                                <div className="toggler-knob"></div>
                            </div>
                        </label> 
                        <span className="mt-4 mr-4"><strong>Analytics</strong> - Bidstacker lagrar data i aggregerat format om användaren och dennes upplevelse av tjänsten. Datan används för att förbättra hemsidan för samtliga besökare, samt förebygga och åtgärda fel.</span>
                    </div>
                    <div className="block mt-4 mr-6 w-full tablet:w-1/2">
                        <label className="toggler-wrapper style-3">
                            <input checked={hotjarAllowed} ref={hotjarRef} onChange={(event) => handleHotjarConsent(event)} name="allow-hotjar" type="checkbox" />
                            <div className="toggler-slider">
                                <div className="toggler-knob"></div>
                            </div>
                        </label>
                        <span className="mt-4 mr-4"><strong>Spårning & Session Replay</strong> - Bidstacker sparar information och data om när användare fullföljer vissa aktiviteter på hemsidan, för att bättre kunna optimera tjänsten och upplevelsen för användaren. Vi använder även Session-Replay för att effektivt kunna åtgärda eventuella fel, Inspelningarna sparas endast 30 dagar innan de raderas.</span>
                    </div>
                </div>
                <div className="mt-4 tablet:pl-4 tablet:pr-8">

                    <button onClick={acceptAll} className="rounded-full border-2 text-sm px-5 mb-2 py-2.5 text-center font-bold btn border-green-cta bg-[#CCF8CF] whitespace-nowrap mr-4 focus:bg-green-cta focus:text-white" type="button">Acceptera alla</button>
                    <button onClick={() => { setOpen(false) }} className="rounded-full border-2 text-sm px-5 py-2.5 text-center font-bold btn whitespace-nowrap mr-4 focus:bg-green-cta focus:text-white" type="button">Tillåt urval</button>
                
                </div>
            </div>

            <p onClick={closeBar} className="absolute top-2 right-4 text-xl cursor-pointer">Stäng</p>
        </div>
     : <div className="absolute bottom-0 left-0 z-40 bg-white">
         <p onClick={openBar} className="mx-4 my-2">🍪&nbsp;Cookie-inställningar</p>
       </div>
    }
    </>
};

export default CookieConsent;