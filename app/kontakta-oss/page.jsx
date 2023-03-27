import ContactForm from '@/components/StartPage/shared/ContactForm';
import Team from '@/components/StartPage/shared/Team';
import { Metadata } from 'next';

export const metadata = {
  title: 'BIDSTACKER | Ta kontakt med oss',
  description: 'Vi ser fram emot att höra från er, lämna era kontaktuppgifter och en kort rad i -ämne/meddelanderaden så ser vi till att någon av våra medarbetare hör av sig till er!'
};

const page = () => {
  return (
    <>
      <ContactForm />
      <Team />
    </>
  );
};

export default page;
