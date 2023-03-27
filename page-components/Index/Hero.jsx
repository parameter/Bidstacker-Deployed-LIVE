import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper>
      <div className="start__graphics-wrapper">
        <div className="start__graphics-holder-one">
          <h2 className="text-3xl font-bold underline">Jämför offerter på byggvaror</h2>
          <h1>En förfrågan, flera offerter + leverans</h1>
        </div>
        <div className="start__graphics-holder-two">
          <img src="images/glad-kund.png" alt="Glad bidstacker-kund" />
        </div>
      </div>
      <div className="bidstacker__register-button-holder">
        <Link href="/management/request" passHref>
          <div className="bidstacker__register-button"><p>Registrera som inköpare</p></div>
        </Link>
        <Link href="/management/supplier" passHref>
          <div className="bidstacker__register-button"><p>Registrera som leverantör</p></div>
        </Link>
        <Link href="/management/delivery" passHref>
          <div className="bidstacker__register-button"><p>Registrera som bud</p></div>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Hero;
