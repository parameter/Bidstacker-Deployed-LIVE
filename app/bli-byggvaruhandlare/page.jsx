import Hero from '@/components/StartPage/shared/Hero';
import Newsletter from '@/components/StartPage/shared/Newsletter';
import WhyUs from '@/components/StartPage/shared/WhyUs';
import BinocularsIcon from 'public/assets/svg/BinocularsIcon';
import MegaphoneIcon from 'public/assets/svg/MegaphoneIcon';
import MicroscopeIcon from 'public/assets/svg/MicroscopeIcon';
import MoneyIcon from 'public/assets/svg/MoneyIcon';
import { Metadata } from 'next';

export const metadata = {
  title: 'BIDSTACKER | Besvara förfrågningar från byggföretag',
  description: 'Öka er försäljning, skicka ut fler offerter till nya kunder. Vi ökar er insyn i affären, så ni kan effektivisera och optimera försäljningen inom er verksamhet.'
};

export default function Requestor() {

  const hero = {
    userRole: 'supplior',
    bg: 'rgba(69, 90, 100, 0.95)',
    title: 'Återförsäljare, hitta nya kunder!',
    textColor: 'white',
    subTitle: 'Öka er lönsamhet, nå ut till fler kunder och optimera logistiken',
    svgImage: '/assets/svg/grafik-supplier-00.svg',
    stepGuide: [
      {
        title: 'Skapa ett konto',
        subTitle: ['Börja med att ansöka', 'Få svar när ansökan godkänts'],
      },
      {
        title: 'Sälj till nya kunder',
        subTitle: ['Besvara förfrågningar', 'Lägg upp överskottspartier', 'Effektivisera logistiken'],
      },
      {
        title: 'Färdigt!',
        subTitle: ['Lämna över materialet', 'Blixtsnabba utbetalningar'],
      },
    ],
  };

  const whyUs = {
    title: 'Varför återförsäljare älskar Bidstacker',
    subTitle:
    <p className="text-start tablet:text-center text-xl text-gray-light-dark dark:text-gray-200 mb-8 tablet:mb-8">
      Ge säljarna rätt förutsättningar att lyckas med fler affärer. Hitta nya kunder och skapa nya affärsmöjligheter genom att distribuera varor till ett större upptagningsområde, vi löser logistiken och säkrar dessutom betalningen!
    </p>,
    features: [
      {
        icon: (
          <MoneyIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Ökad konvertering',
        subTitle:
          'Vi förmedlar leadsen, ni skickar offerterna. Svara på förfrågningar eller sälj överskottspartier till nya kunder.',
      },
      {
        icon: (
          <BinocularsIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Optimal affärsinsyn',
        subTitle:
          'Genom användardata och notifikationer får ni kontinuerlig information om hur er offert står sig mot kunden.',
      },
      {
        icon: (
          <MicroscopeIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Uförliga kontroller',
        subTitle:
          'Vi utför en noggrann kontroll av såväl användare såsom eventuella förfrågningar som inkommit till oss.',
      },
      {
        icon: (
          <MegaphoneIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Reducerad reklamkostnad',
        subTitle:
          'Vi sänker era kundförvärvskostnader. Ni spenderar mindre resurser på marknadsföring och reklam.',
      },
    ],
  };

  return (
    <>
      <div className="text-green-dark text-green-darker">
        <Hero hero={hero} />
        <WhyUs whyUs={whyUs} />
        <Newsletter source="/assets/video/warehouse.mp4" />
      </div>
    </>
  );
}
