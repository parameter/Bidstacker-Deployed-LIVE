import Hero from '../components/StartPage/Hero';
import Link from 'next/link';
import Newsletter from '../components/StartPage/shared/Newsletter';
import BuyerStepGuideDesktop from '../components/StartPage/buyer/BuyerStepGuideDesktop';
import BuyerStepGuideMobile from '../components/StartPage/buyer/BuyerStepGuideMobile';
import WhyUsShared from '../components/StartPage/shared/WhyUs';
import BinocularsIcon from 'public/assets/svg/BinocularsIcon';
import MegaphoneIcon from 'public/assets/svg/MegaphoneIcon';
import MicroscopeIcon from 'public/assets/svg/MicroscopeIcon';
import MoneyIcon from 'public/assets/svg/MoneyIcon';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata = {
  title: 'BIDSTACKER | Sälj, handla eller kör ut byggmaterial med bidstacker.',
  description: 'Vi hjälper återförsäljare att hitta nya kunder, byggföretag att jämföra offerter på material och åkerier att utnyttja lastbilsflottans fulla kapacitet.'
};

const steps_content = {
  title: 'Fördelarna med att använda Bidstacker',
  steps: [
    {
      title: 'En inköpstjänst för byggföretag',
      rows: [
        'Jämför offerter',
        'Spara tid & pengar',
        'Bredare sortiment',
        'Gratis att använda'
      ]
    },
    {
      title: 'Marknadsplats för leverantörer',
      rows: [
        'Hitta nya kunder',
        'Ökad affärsinsyn',
        'Färre kreditförluster',
        'Lättanvänd tjänst'
      ]
    },
    {
      title: 'Uppdragspool för åkerier',
      rows: [
        'Kör fulla lastbilar',
        'Ta fler uppdrag',
        'Ni avgör när & var',
        'Generösa arvoden'
      ]
    }
  ]
}

export default function Home() {

  console.log('HERE is page from server');

  return (
    <>
      <Hero
        fontColor={'orange'}
        heading=""
        subheading="Inköpstjänsten som länkar byggföretag med kvalitetssäkrade återförsäljare och åkerier"
      >
        <div className="absolute left-0 top-0 w-full h-full bg-[rgba(75,61,48,0.93)] z-10"></div>

        <video
          src="/assets/video/planning.mp4"
          type="video/mp4"
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay
          loop
          muted
        />
      </Hero>

      <div className="flex flex-col justify-center">
        <h1 className="text-gray-creamy-dark text-center py-6">
          Lönsamhet, Hållbarhet & Effektivitet
        </h1>
      </div>

      <div className="relative bg-[url('/assets/svg/home-graphix-mobile.svg')] mobile:bg-[url('/assets/svg/home-graphix-00.svg')] tablet:bg-[url('/assets/svg/home-graphix-00.svg')] bg-no-repeat flex flex-col items-center py-6 home-svg-part">
        <div className="flex flex-col mobile:flex-col tablet:flex-row pl-6 pr-6 tablet:pr-0 home-svg-part__section-one">
          <div className="mobile:w-full tablet:w-2/3">
            <h3 className="text-3xl mobile:text-5xl text-white mb-4">
              Lönsammare inköp
            </h3>
            <p className="text-base font-medium desktop:text-xl text-white">
              Det är vanligt att byggföretag förlorar arbetstid på att leta fram
              byggvaror som de inte kan allokera genom ordinarie
              återförsäljarkanaler. Det medför att många entreprenörer idag
              råkar ut för onödiga byggavbrott som enkelt hade kunnat förebyggas.
            </p>
          </div>
          <div className="mobile:w-full tablet:w-1/3 flex flex-col justify-center mobile:items-start tablet:items-center mobile:pl-0 pt-6 tablet:pl-10">
            <Link href="/hitta-byggvaror">
              <button className="rounded-full text-base px-5 py-2.5 text-center btn bg-green-cta text-white font-bold">
                JÄMFÖR OFFERTER
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col mobile:flex-col tablet:flex-row pl-6 pr-6 tablet:pr-0 home-svg-part__section-two">
          <div className="mobile:w-full tablet:w-2/3">
            <h3 className="text-3xl mobile:text-5xl text-gray-creamy-dark mb-4">
              Hållbar Materialhandel
            </h3>
            <p className="text-base font-medium desktop:text-xl text-gray-creamy-dark">
              Förutom att effektivisera materialflödet så strävar vi efter att 
              öka omsättningen av överskottspartier och på så sätt undvika onödigt 
              materialspill. Byggvaruhandlare är välkomna att ansluta sig för 
              att besvara förfrågningar, publicera överskottspartier, återbruksmaterial, eller använda vår leveranstjänst.
            </p>
          </div>
          <div className="mobile:w-full tablet:w-1/3 flex flex-col justify-center mobile:items-start tablet:items-center mobile:pl-0 pt-6 tablet:pl-10">
            <Link href="/bli-byggvaruhandlare">
              <button className="rounded-full text-base px-5 py-2.5 text-center btn bg-green-cta text-white font-bold">
                SÄLJ BYGGMATERIAL
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col mobile:flex-col tablet:flex-row pt-24 pb-36 pl-6 pr-6 tablet:pr-0 home-svg-part__section-three">
          <div className="mobile:w-full tablet:w-2/3">
            <h3 className="text-3xl mobile:text-5xl text-green-cta mb-4">
              Effektiva logistiklösningar
            </h3>
            <p className="text-base font-medium desktop:text-xl text-gray-creamy-dark">
              Vi erbjuder Åkerier leveransuppdrag inom byggmaterialhandeln, så att färre åkare behöver köra med halvtomma lastutrymmen. Det tror vi är effektivt och klimatsmart, vi matchar rätt förare med rätt uppdrag! Vår logistiktjänst skapar lönsamhet för åkerierna och reducerar ledtiderna för byggare och handlare.
            </p>
          </div>
          <div className="mobile:w-full tablet:w-1/3 flex flex-col justify-center mobile:items-start tablet:items-center mobile:pl-0 pt-6 tablet:pl-10">
            <Link href="/leverera-byggvaror">
              <button className="rounded-full text-base px-5 py-2.5 text-center btn bg-green-cta text-white font-bold">
                LEVERERA BYGGVAROR
              </button>
            </Link>
          </div>
        </div>

        <Image
          className="absolute bottom-[28%] right-[14%] home-svg-part__car"
          src="/assets/svg/home-graphix-car.svg"
          width={300}
          height={198}
          alt="home-graphix-car"
        />
      </div>

      <div className="desktop:hidden">
        <BuyerStepGuideMobile />
      </div>
      <div className="hidden desktop:block">
        <BuyerStepGuideDesktop steps={steps_content} />
      </div>
      <Newsletter source="/assets/video/construction.mp4" />
    </>
  );
}
