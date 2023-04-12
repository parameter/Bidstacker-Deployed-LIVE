'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CustomerService from './CustomerService';
import FaqQuestions from './FaqQuestions';
import general_settings from '@/content-json/general-settings-json';
 
const TabsCustomerService = () => {
  const [tab, setTab] = useState('buyer');

  // INFO TEXT FOR BUYERS
  const infoBuyer = {
    user: 'Är ni inköpare?',
    text: 'Det är inte alltid enkelt att sköta inköpen på egen hand! Har ni frågor rörande användningen av vår tjänst eller kring inköp av byggmaterial? Kontakta vår kundtjänst eller sök svaren i vår FAQ nedtill.',
    helpText: [
      'Upprätta konto',
      'Hjälp med att skapa en förfrågan',
      'Få hjälp att hitta byggvaror',
      'Produktfrågor om byggvaror',
      'Hjälp med byggvaruleveranser',
      'Teknisk support',
    ],
  };

  // INFO TEXT FOR RESELLER
  const infoReseller = {
    user: 'Är ni byggvaruhandlare?',
    text: 'Har ni funderingar kring användningen av vår tjänst eller hur vi kan hjälpa er att öka er försäljning av byggvaror? Kontakta vår kundtjänst, eller sök svaren i vår FAQ nedtill!',
    helpText: [
      'Upprätta konto',
      'Hanteringar av återförsäljarkontot/avtal',
      'Lämna offerter på förfrågningar',
      'Funktionalitet och användning av tjänsten',
      'Hitta lediga åkerier',
      'Teknisk support',
    ],
  };

  // INFO TEXT FOR DELIVERY
  const infoDelivery = {
    user: 'Är ni åkare?',
    text: 'Vår kundtjänst hjälper er med att få svar på era frågor samt att komma igång med, eller optimera användningen av vår tjänst. Ni hittar även våra vanligaste frågor nedtill!',
    helpText: [
      'Upprätta konto',
      'Tjänstens funktioner',
      'Användarvillkor',
      'Klagomål',
      'Övriga frågor',
      'Teknisk support',
    ],
  };

  // FAQ QUESTIONS FOR BUYERS
  const questionsBuyer = [
    {
      question: 'Hur ofta får jag begära in offerter?',
      answer: 'Du kan skapa ett flertal förfrågningar – det finns med andra ord ingen gräns för antalet förfrågningar som du kan publicera.',
    },
    {
      question: 'Vad kostar det att använda tjänsten?',
      answer: 'Det är kostnadsfritt att använda vår inköpstjänst.',
    },
    {
      question: 'Är det möjligt att addera fler användare till vårat konto?',
      answer: 'Det är möjligt att utan kostnad addera upp till 2 användare per inköpskonto.',
    },
    {
      question: 'Hur kan byggföretag använda Bidstackers tjänst?',
      answer: 'Byggföretagen kan använda Bidstacker för att inhämta flera offerter på byggvaror. Förfrågningarna förmedlas beroende på deras innehåll till rätt återförsäljare. Det lämnar köparen med bättre villkor och kortare ledtider.'
    },
    {
      question: 'Kan vi få hjälp med leveranser?',
      answer: 'Vi vill underlätta hela inköpsprocessen, vilket också inbegriper logistiken. Det gör vi genom att para rätt leverans med rätt åkeri. Ta kontakt med vår kundtjänst för mer information.'
    }
  ];

  //   FAQ QUESTIONS FOR SELLERS
  const questionsReseller = [
    {
      question: 'Hur kan Bidstacker hjälpa byggvaruhandlare?',
      answer: 'Bidstacker är en bred tjänst som bland annat tillåter byggvaruhandlare att erbjuda bättre logistiklösningar, bli av med överskottspartier och upprätta nya affärer genom att besvarar offerter från nya kunder!'
    },
    {
      question: 'Hur går det till att sälja varor via Bidstacker?',
      answer: 'Återförsäljare som önskar ansluta sig till Bidstacker ska bedriva sin verksamhet i Sverige, och/eller inom EU/EES. Vidare krav framgår vid ansökan, ni är även välkomna att kontakta vår kundtjänst för ytterligare information.',
    },
    {
      question: 'Vad kostar det att använda tjänsten som återförsäljare?',
      answer: 'Bidstacker tar ut en transaktionsavgift vid försäljningar och en fast årsavgift. Mer information om våra avgifter kan utelämnas av vår kundtjänst.',
    },
    {
      question: 'Hur lång tid tar det innan vi får pengar utbetalda för sålda varor?',
      answer: 'Det tar i regel 2-3 arbetsdagar innan betalningen bokförs på erat konto, oavsett om kunden valt fakturabetalning eller kortbetalning. Skulle det uppstå några problem under utbetalningen så ber vi er snarast att ta kontakt med vår avdelning för fakturor ekonomi@bidstacker.se',
    }
  ];

  //   FAQ QUESTIONS FOR DELIVERY
  const questionsDelivery = [
    {
      question: 'Hur kan Åkerier dra nytta av Bidstacker?',
      answer: 'Vi hjälper åkerier att undvika att köra med halvfulla lastutrymmen, genom att erbjuda leveransuppdrag av byggmaterial. Låt chauffören eller ledningspersonalen få notifieringar om intressanta närliggande leveransuppdrag direkt i mejlen!'
    },
    {
      question: 'Vilka arbetstider kan man förvänta sig hos er?',
      answer: 'Du är din egna chef – och bestämmer vilka dagar och tider som du arbetar. Leverera så mycket, och så ofta du vill, din lön baseras delvis på antalet utförda leveranser.',
    },
    {
      question: 'Erbjuder ni bonusar?',
      answer: 'Lönen består dels av en fast grundlön och bonusar som erhålls genom utförda leveranser, den kan även öka vid högre efterfrågan (peak-hours), helgdagar, liksom obekväma tider. Ytterligare information om våra bonusmodeller lämnas ut under introduktionsperioden.',
    },
    {
      question: 'Förutsättningar för att få leverera för bidstacker?',
      answer: 'En förutsättning för att kunna utföra leveranser för bidstacker, är först och främst en smarttelefon (min. Android 9.0, iOS 12.',
    },
    {
      question: 'Vilka krav ställs på fordon som skall nyttjas under tjänsten.',
      answer: 'Vi ställer vissa krav på fordonens lämplighet, närmare information kan fås av vår kundtjänst eller vid en ansökan.',
    },
  ];

  return (
    <>
      <div className="max-w-[900px] mx-auto">
        <ul className="flex justify-center pt-2 w-full mt-2">
          <li
            className={`px-2 tablet:px-8 text-base tablet:text-lg py-2 rounded-t-xl cursor-pointer ${
              tab === 'buyer' &&
              'text-[#F9B300] bg-white dark:bg-gray-light-dark font-semibold'
            }`}
            onClick={() => setTab('buyer')}
          >
            Inköpare
          </li>
          <li
            className={`px-2 tablet:px-8 text-base tablet:text-lg py-2 rounded-t-xl cursor-pointer ${
              tab === 'reseller' &&
              'text-[#F9B300] bg-white dark:bg-gray-light-dark font-semibold'
            }`}
            onClick={() => setTab('reseller')}
          >
            Återförsäljare
          </li>
          <li
            className={`px-2 tablet:px-8 text-base py-2 rounded-t-xl cursor-pointer ${
              tab === 'delivery' &&
              'text-[#F9B300] bg-white dark:bg-gray-light-dark font-semibold'
            }`}
            onClick={() => setTab('delivery')}
          >
            Åkare
          </li>
        </ul>
        {tab === 'buyer' && <CustomerService info={infoBuyer} />}
        {tab === 'reseller' && <CustomerService info={infoReseller} />}
        {tab === 'delivery' && <CustomerService info={infoDelivery} />}

        {tab === 'buyer' && <FaqQuestions questions={questionsBuyer} />}
        {tab === 'reseller' && <FaqQuestions questions={questionsReseller} />}
        {tab === 'delivery' && <FaqQuestions questions={questionsDelivery} />}

        <div className="flex flex-col tablet:flex-row gap-2 mt-6">
          <div className="bg-[#f9b300] text-white text-lg flex-1 flex flex-col justify-center items-center rounded-xl p-8">
            <p className="text-base tablet:text-lg font-bold">Maila till</p>
            <Link
              href={"mailto:" + general_settings.email}
              className="cursor-pointer text-white text-base tablet:text-lg hover:underline"
            >
              {general_settings.email}
            </Link>
          </div>
          <div className="bg-[#f9b300] text-white flex-1 flex flex-col justify-center items-center rounded-xl p-8">
            <p className="text-base tablet:text-lg font-bold">
              Ring mellan 09:00-15:00
            </p>
            <Link
              href={"tel:" + general_settings.telephone}
              className="cursor-pointer text-white text-base tablet:text-lg hover:underline"
            >
              {general_settings.telephone}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsCustomerService;
