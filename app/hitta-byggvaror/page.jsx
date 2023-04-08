import Hero from '@/components/StartPage/shared/Hero';
import Newsletter from '@/components/StartPage/shared/Newsletter';
import WhyUs from '@/components/StartPage/shared/WhyUs';
import MoneyIcon from 'public/assets/svg/MoneyIcon';
import { Metadata } from 'next';
import SeedIcon from 'public/assets/svg/SeedIcon';
import PercentIcon from 'public/assets/svg/PercentIcon';

export const metadata = {
  title: 'BIDSTACKER | Jämför offerter på byggmaterial',
  description: 'Fynda bland massvis av byggvaror och återbruksmaterial från olika byggvaruhandlare, genom ett konto. Vi hjälper byggföretag att reducera inköpskostnader samt ledtider, helt kostnadsfritt!'
};

export default function Requestor() {

  const hero = {
    userRole: 'requestor',
    bg: 'rgba(40,38,35,0.97)',
    title: 'Tröttnat på komplementinköp?',
    textColor: 'white',
    subTitle: 'Få offerter på byggvaror & restpartier. Hämta själv eller använd våra expressbud.',
    svgImage: '/assets/svg/grafik-supplier-00.svg',
    stepGuide: [
      {
        title: 'Skapa Förfrågan!',
        subTitle: ['Skapa en förfrågan', 'Få flera offertförslag på byggvaror'],
      },
      {
        title: 'Acceptera Offerten!',
        subTitle: ['Betala med kort eller genom faktura', 'Säljaren packar ordern'],
      },
      {
        title: 'Klart!',
        subTitle: ['Utkörning eller upphämtning?', 'Välj det alternativ som passar!'],
      },
    ],
  };
  
  const whyUs = {
    title: 'Hitta byggmaterialet oavsett var ni befinner er',
    subTitle: (
      <h1 className="text-start font-normal tablet:text-center text-xl text-gray-light-dark dark:text-gray-200 mb-8 tablet:mb-8">
        Hantverkarna slipper pendla mellan brädgårdarna. Hitta rätt material i rätt tid, till rätt pris. Vi hjälper entreprenörer att undvika byggavbrott och dyra inköpskostnader, helst gratis.
      </h1>
    ),
    features: [
      {
        icon: (
          <MoneyIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Jämför Offerter',
        subTitle:
          'Hämta in flera offerter på byggvaror genom en förfrågan. Schyssta priser och villkor av verifierade handlare.',
      },
      {
        icon: (
          <PercentIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Handla Överskottspartier',
        subTitle:
          'Bidra till att reducera materialhandels påverkan på miljön och få kanondeals på byggmaterial.',
      },
      {
        icon: (
          <SeedIcon
            width="40px"
            height="40px"
            className="mb-4 text-gray-light-dark dark:text-gray-light"
          />
        ),
        title: 'Klimatvänliga leveranser',
        subTitle:
          'Välj rätt bud för rätt typ av leverans, med vår lösning kan ni minimera er klimatinverkan.',
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
