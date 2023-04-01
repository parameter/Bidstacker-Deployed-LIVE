"use client";

import Script from 'next/script';
import Cookies from 'js-cookie';
import { useAppContext } from 'context/app-context';

const InjectedScripts = () => {
    const { analyticsAllowed, hotjarAllowed } = useAppContext();

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
        {true === analyticsAllowed || Cookies.get('analytics-allowed') === 'true' && 
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

        {true === hotjarAllowed || Cookies.get('hotjar-allowed') === 'true' && 

          <Script id="google-analytics" strategy='afterInteractive'>
            {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
          </Script>

        }

    </>
    )
}

export default InjectedScripts;