import Link from 'next/link';
import AnimatedWords from '@/components/StartPage/AnimatedWords';

const Hero = ({ fontColor, userRole, heading, subheading, children }) => {
 
  return (<>
    <div className='overflow-hidden relative h-auto mobile:h-[calc(100vh-60px)] tablet:h-full desktop:h-full flex flex-col justify-center'>
      <div className="relative flex flex-col tablet:flex-row pt-20 mobile:pt-20 h-auto desktop:h-[100vh] justify-end items-center z-20">
        <div className='relative pt-40 pb-8 px-0 mobile:px-5 mb-12 mobile:mb-12 tablet:mb-0 tablet:min-h-[600px] block tablet:flex flex-col justify-end w-full z-20'>

          <div className="startpage-hero-splash rounded-0 mobile:rounded-3xl self-start mb-4 max-w-[1100px]">
            <AnimatedWords fontColor={fontColor} />
            
            {/* FOR the animated words above */}
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
            <h1 className="text-base max-[500px]:text-lg mobile:text-2xl tablet:text-3xl desktop:text-3xl leading-[28px] text-white headline-shadow">{subheading}</h1>
          </div>
          <div className='block tablet:flex flex-wrap gap-3 tablet:gap-5 px-6'>
            <Link href='/hitta-byggvaror'>
              <button 
                tabIndex="-1"
                className={`relative rounded-lg w-full text-lg px-8 py-3 tablet:py-4 mb-6 font-semibold text-center bg-yellow rounded-3xl font-bold hero-cta-styles`}
              >
                JÄMFÖR OFFERTER
              </button>
            </Link>
            <Link href='/bli-byggvaruhandlare'>
              <button
                tabIndex="-1"
                className={`relative rounded-lg w-full bg-[#425861] text-white font-semibold text-lg px-8 py-3 tablet:py-4 rounded-3xl mb-6 text-center hero-cta-styles`}
              >
                SÄLJ BYGGMATERIAL
              </button>
            </Link>
            <Link href='/leverera-byggvaror'>
              <button
                tabIndex="-1"
                className={`relative rounded-lg w-full bg-[#76A37A] text-lg font-semibold px-8 py-3 tablet:py-4 mb-6 rounded-3xl text-center hero-cta-styles`}
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
