import Link from 'next/link';
import Image from 'next/image';
import AnimatedWords from '@/components/StartPage/AnimatedWords';

const Hero = ({ fontColor, userRole, heading, subheading, children }) => {

  return (<>
    <div className='overflow-hidden relative h-[calc(100vh-60px)] mobile:h-[calc(100vh-60px)] tablet:h-full desktop:h-full mobile:flex-col flex flex-row justify-center'>
      <div className="relative flex flex-col tablet:flex-row mobile:pt-20 h-[100vh] justify-end items-center z-20">
        <div className='pb-8 px-0 mobile:px-5 mb-12 mobile:mb-12 tablet:mb-0 tablet:min-h-[600px] flex flex-col justify-end w-full  z-20 '>
          <Image 
            src='/assets/svg/splash-2023-00.svg'
            alt="Bidstacker logotype"
            width={220}
            height={240}
            className="absolute right-[20%] top-[19%] mobile:top-1/4 w-[190px] mobile:w-[220px] desktop:w-[280px]"
          />
          <AnimatedWords fontColor={fontColor} />
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
          <h1 className={fontColor ? 'text-xl tablet:text-2xl leading-[28px] mb-6 text-white headline-shadow px-6' : 'text-xl tablet:text-2xl leading-[28px] mb-6 headline-shadow px-6'}>{subheading}</h1>
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
