import Link from 'next/link';
import FacebookIcon from '../../public/assets/svg/FacebookIcon';
import LinkedinIcon from '../../public/assets/svg/LinkedinIcon';
import InstagramIcon from '../../public/assets/svg/InstagramIcon';
import TwittedIcon from '../../public/assets/svg/TwittedIcon';
import Image from 'next/image';

const Footer = ({ children }) => {
  return (
    <footer className="relative px-4 pt-4 pb-12 bg-white dark:bg-black">
      <div className="container mx-auto px-10 mt-10 tablet:flex tablet:justify-between">
        <div className="mb-6 tablet:mb-0">
          <Link href="/">
            <Image
              src="/assets/img/bidstacker-logo.webp"
              alt="Bidstacker logotype"
              width={220}
              height={75}
              className="w-[220px] desktop:w-[280px] -ml-5"
            />
          </Link>
          <p className="hidden desktop:block max-w-[600px] text-gray-600 mt-2 mb-10 pr-5">
            Tanken med Bidstacker är att byggföretag enkelt skall kunna
            lokalisera och handla byggvaror samt dra nytta av våra snabba
            leveransalternativ för att undvika avbrott på bygget. Vi vill
            reducera byggföretagens manuella och administrativa arbete vid
            inköpsprocessen.
          </p>
        </div>
        <div className="grid grid-cols-2 mobile:gap-[100px]">
          <div className="mt-2">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
              navigation
            </h3>
            <ul>
              <li className="mb-4">
                <Link href="/" className="text-gray-600 hover:underline">
                  Start
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/hur-bidstacker-grundades"
                  className="text-gray-600 hover:underline"
                >
                  Om Bidstacker
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/kundservice"
                  className="text-gray-600 hover:underline"
                >
                  Vanliga frågor
                </Link>
              </li>
              <li>
                <Link href="/kontakta-oss" className="text-gray-600 hover:underline">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-2">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Stalka oss
            </h3>
            <ul className="flex flex-wrap gap-2">
              <li className="mb-1">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/bidstacker-se"
                >
                  <LinkedinIcon
                    className="text-gray-dark dark:text-gray-dark hover:text-[#0e76a8] dark:hover:text-[#0e76a8] cursor-pointer ease-in duration-300"
                    width="35px"
                    height="35px"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/bidstacker"
                >
                  <FacebookIcon
                    className="text-gray-dark dark:text-gray-dark hover:text-[#4267B2] dark:hover:text-[#4267B2] cursor-pointer ease-in duration-300"
                    width="35px"
                    height="35px"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/bidstacker/"
                >
                  <InstagramIcon
                    className="text-gray-dark dark:text-gray-dark hover:text-[#833AB4] dark:hover:text-[#833AB4] cursor-pointer ease-in duration-300"
                    width="35px"
                    height="35px"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/bidstacker"
                >
                  <TwittedIcon
                    className="text-gray-600 hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2] cursor-pointer ease-in duration-300"
                    width="30px"
                    height="30px"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="container mx-auto px-10 my-6 border-gray-200 mobile:mx-auto desktop:my-8" />
      <div className="container mx-auto px-0 tablet:px-10 flex flex-col tablet:flex-row items-center justify-between mb-[60px] tablet:mb-0 gap-2">
        <p className="text-sm text-center">
          © 2023{' '}
          <Link href="/" className="hover:underline">
            Bidstacker™
          </Link>
          . All Rights Reserved.
        </p>

        <p className="text-sm text-center">
          <Link href="/villkor/anvandarvillkor">
            <span>Användarvillkor</span>
          </Link>
          &nbsp;&&nbsp;
          <Link href="/villkor/integritetspolicy">
            <span>policy</span>
          </Link>
        </p>
        
      </div>
      {children}
    </footer>
  );
};

export default Footer;