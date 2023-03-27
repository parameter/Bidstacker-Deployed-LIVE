"use client";

import Script from 'next/script';
import { useAppContext } from 'context/app-context';

const InjectedScripts = () => {
    const { analyticsAllowed } = useAppContext();

    const getCookie = (cname) => {
        if (!process.browser) { return };
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

    return (
    <>
        {true === analyticsAllowed || getCookie('analytics-allowed') === true && 
            <>
                {console.log('InjectedScripts', analyticsAllowed)}
                <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`} strategy='afterInteractive' />
                <Script id="google-analytics" strategy='afterInteractive'>
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
                    `}
                </Script>
            </>
        }   
    </>
    )
}

export default InjectedScripts;