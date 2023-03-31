'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCurrentUser } from '@/lib/user';
import FormInput from '@/components/Form/FormInput';
import saveAccountApplication from '@/lib/save-account-application';

const Hero = ({ fontColor, userRole, heading, subheading, children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [terms, setTerms] = useState(false);
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState('');
  const pathname = usePathname();
  const { data: { user } = {} } = useCurrentUser();
  const heroWrapperRef = useRef();

  const [animatedWordText_one, setAnimatedWordText_one] = useState('');
  const [animatedWordText_two, setAnimatedWordText_two] = useState('');

  const animatedWord_one = useRef();
  const animatedWord_two = useRef();
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
       
      // setAnimationStarted(true);

      var animationFrameHandle;

      const elts = {
        text1: animatedWord_one.current,
        text2: animatedWord_two.current
      };
      
      const texts = [
          "LÖNSAM",
          "EFFEKTIV",
          "HÅLLBAR"
      ];
      
      const morphTime = 1;
      const cooldownTime = 2;
      
      let textIndex = texts.length - 1;
      let time = new Date();
      let morph = 0;
      let cooldown = cooldownTime;
      
      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      
      function doMorph() {
          morph -= cooldown;
          cooldown = 0;
      
          let fraction = morph / morphTime;
      
          if (fraction > 1) {
              cooldown = cooldownTime;
              fraction = 1;
          }
      
          setMorph(fraction);
      }
      
      function setMorph(fraction) {
          elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
          fraction = 1 - fraction;
          elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
          elts.text1.textContent = texts[textIndex % texts.length];
          elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      }
      
      function doCooldown() {
          morph = 0;
      
          elts.text2.style.filter = "";
          elts.text2.style.opacity = "100%";
      
          elts.text1.style.filter = "";
          elts.text1.style.opacity = "0%";
      }
      
      function animate() {
        animationFrameHandle = requestAnimationFrame(animate);
      
          let newTime = new Date();
          let shouldIncrementIndex = cooldown > 0;
          let dt = (newTime - time) / 1000;
          time = newTime;
      
          cooldown -= dt;
      
          if (cooldown <= 0) {
              if (shouldIncrementIndex) {
                  textIndex++;
              }
      
              doMorph();
          } else {
              doCooldown();
          }
      }
      
      animate();

    

    return () => {
      window.cancelAnimationFrame(animationFrameHandle)
    }

  },[animatedWord_one, animatedWord_two])
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    const target = event.target;
    var result = await saveAccountApplication({
      email: target.email.value,
      businessName: target.businessName.value,
      contactNumber: target.contactNumber.value,
      contactName: target.contactName.value,
      role: userRole
    });
    console.log(result);
  }
 
  return (<>
    <div ref={heroWrapperRef} className='overflow-hidden relative h-[calc(100vh-60px)] mobile:h-[calc(100vh-60px)] tablet:h-full desktop:h-full mobile:flex-col flex flex-row justify-center'>
      <div className="relative flex flex-col tablet:flex-row mobile:pt-20 h-[100vh] justify-end items-center z-20">
        <div className='pb-8 px-0 mobile:px-5 mb-12 mobile:mb-12 tablet:mb-0 tablet:min-h-[600px] flex flex-col justify-end w-full  z-20 '>
          <h1 className={fontColor ? 'mb-2 text-orange headline-shadow pl-6 flex flex-row flex-wrap text-3xl tablet:text-5xl desktop:text-7xl' : 'text-3xl tablet:text-5xl desktop:text-7xl headline-shadow mb-2 pl-6 flex flex-row flex-wrap'}>
            EN&nbsp;
            
            <span className="animated_morphing_words_container text-[#76A37A]">
              <span ref={animatedWord_one}>{animatedWordText_one}</span>
              <span ref={animatedWord_two}>{animatedWordText_two}</span>
            </span>

            <span>&nbsp;</span>
            MATERIALHANDEL
          </h1>
          {/* FOR the animated words above  */}
          <svg style={{display: 'none'}} id="filters">
              <defs>
                  <filter id="threshold">
                      <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 255 -140" />
                  </filter>
              </defs>
          </svg>
          {/* END - FOR the animated words above - END */}
          <h3 className={fontColor ? 'text-xl tablet:text-2xl leading-[28px] mb-6 text-white headline-shadow px-6' : 'text-xl tablet:text-2xl leading-[28px] mb-6 headline-shadow px-6'}>{subheading}</h3>
          <div className='flex flex-wrap gap-3 tablet:gap-5 px-6'>
            <Link href='/hitta-byggvaror'>
              <button
                className={`rounded-full text-base tablet:text-lg px-8 py-4 font-semibold text-center bg-yellow rounded-3xl font-bold`}
              >
                JÄMFÖR OFFERTER
              </button>
            </Link>
            <Link href='/bli-byggvaruhandlare'>
              <button
                className={`rounded-full bg-[#425861] text-white font-semibold text-base tablet:text-lg px-8 rounded-3xl py-4 text-center`}
              >
                SÄLJ BYGGMATERIAL
              </button>
            </Link>
            <Link href='/leverera-byggvaror'>
              <button
                className={`rounded-full bg-[#76A37A] text-base tablet:text-lg font-semibold px-8 py-4 rounded-3xl text-center`}
              >
                LEVERERA BYGGVAROR
              </button>
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  </>);
};

export default Hero;
