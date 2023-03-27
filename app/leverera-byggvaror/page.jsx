import Hero from '@/components/StartPage/shared/Hero';
import Newsletter from '@/components/StartPage/shared/Newsletter';
import WhyUs from '@/components/StartPage/shared/WhyUs';
import PercentIcon from 'public/assets/svg/PercentIcon';
import PuzzleIcon from 'public/assets/svg/PuzzleIcon';
import SeedIcon from 'public/assets/svg/SeedIcon';
import TimeIcon from 'public/assets/svg/TimeIcon';
import { Metadata } from 'next';

export const metadata = {
  title: 'BIDSTACKER | Tjäna extra på att leverera byggvaror',
  description: 'Skaffa nya uppdrag längst med körsträckan, fyll ut lastbilarna och öka er omsättning med Bidstacker. Vi hjälper er att dra nytta av er lastkapacitets fulla kapacitet.'
};

export default function Delivery({ params }) {
  const hero = {
    userRole: 'deliveror',
    bg: 'rgba(109,163,111,0.90)',
    title: 'Åkerier, öka er sysselsättning och omsättning!',
    textColor: 'white',
    subTitle: 'Vi förmedlar leveransuppdrag inom byggmaterialhandeln',
    svgImage: '/assets/svg/grafik-delivery-00.svg',
    stepGuide: [
      {
        title: 'Anslut er',
        subTitle: ['Börja med att ansöka', 'Få svar när ansökan godkänts'],
      },
      {
        title: 'Utför ett uppdrag',
        subTitle: [
          'Hämta byggvaror hos återförsäljare',
          'Leverera byggvarorna till kund',
        ],
      },
      {
        title: 'Färdigt!',
        subTitle: ['Vi sköter administrationen', 'Arvodet utbetalas efter leveransen'],
      },
    ],
  };

  const whyUs = {
    title: 'Varför åkerier älskar Bidstacker',
    subTitle: <p className="text-start tablet:text-center text-xl text-gray-light-dark dark:text-gray-200 mb-8 tablet:mb-8">
      Åkerier kan öka sin lönsamhet genom att utföra leveranser i sitt närområde, eller längs med befintliga körsträckor. Transportfirmor kan minimera sin klimatinverkan genom att i mindre utsträckning köra med halvfulla lastutrymmen. Fyll upp lastutrymmet det är både lönsamt, effektivt och klimatsmart!
      </p>,
    features: [
      {
        icon: (
          <PercentIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Ökade intäkter',
        subTitle: 'Fyll ut er arbetstid, och era lastutrymmen. Chaufförerna kan utnyttja lastbilarnas fulla kapacitet.',
      },
      {
        icon: (
          <TimeIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Flexibel Tjänst',
        subTitle:
          'Ni väljer arbetstiderna, och körningarna. Ta körningar i närområdet eller längst med körsträckan.',
      },
      {
        icon: (
          <SeedIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Miljövänligt',
        subTitle:
          'Kör fulla lastbilar, minska utsläppen. Det lönar sig ekonomiskt och bidrar till bättre hållbarhet.',
      },
      {
        icon: (
          <PuzzleIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Kompatibelt',
        subTitle:
          'Tjänsten är lätt att integrera och konfigurera. Noll extraarbete, desto enklare att komma igång.',
      },
    ],
  };

  return (
    <>
      <Hero hero={hero} />
      <WhyUs whyUs={whyUs} />
      <Newsletter source="/assets/video/truck.mp4" />
    </>
  );
}
