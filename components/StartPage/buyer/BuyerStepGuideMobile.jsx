import Image from 'next/image';
import Link from 'next/link';
import BgArrowsMobile from '../../../public/assets/svg/BgArrowsMobile';
import SendIcon from '../../../public/assets/svg/SendIcon';

const BuyerStepGuideMobile = () => {
  return (
    <div className="bg-gray-light dark:bg-gray-light-dark py-[50px]">
      <div className="flex flex-col items-center container mx-auto px-[5px]">
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold text-center mb-[50px]">Upplev fördelarna med bidstacker</h2>
        </div>
        <div className="relative w-[343px]">
          
          <div className="relative w-full h-full flex flex-col">
            <div className="top-5">
              <h3 className="font-bold mb-5">En inköpstjänst för byggföretag</h3>
              <div className="flex gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <p className="text-base">Bättre kontroll över inköpskostnaderna</p>
              </div>
              <div className="flex gap-2 mb-4">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <p className="text-base">Mindre ödslad tid</p>
              </div>
              <div className="flex gap-2 mb-4">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <p className="text-base">Korta ledtider</p>
              </div>
              <div className="flex gap-2 mb-4">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <p className="text-base">Kostnadsfri tjänst</p>
              </div>

              <button className="btn btn-yellow text-sm font-bold px-3 py-3 mr-3">
                <Link href="/hitta-byggvaror">Anslut</Link>
              </button>

              {/* <button className="btn btn-white font-bold text-sm px-3 py-3">
                <Link href="/">Skapa Förfrågan</Link>
              </button> */}
              
            </div>
            <div className="left-0 mt-16">
              <h3 className="font-bold text-xl mb-5">Marknadsplats för byggvaruhandlare</h3>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <p className="text-base">
                  Börja sälja till nya kunder
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <p className="text-base">
                  Ni får bättre affärsinsyn
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <p className="text-base">
                  Ni slipper kreditrisken
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <p className="text-base">
                  Enkelt att anpassa och integrera
                </p>
              </div>

              <button className="btn btn-yellow text-sm font-bold px-3 py-3 mr-3">
                <Link href="/bli-byggvaruhandlare">Anslut</Link>
              </button>
            </div>

            
            <div className="mt-16 mb-6">
              <h3 className="font-bold text-xl mb-5">Uppdragspool för åkerier</h3>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <div>
                  <p className="text-base">Dra nytta av flottans fulla lastkapacitet</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <div>
                  <p className="text-base">Ta uppdrag längst med befintliga körsträckor</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <div>
                  <p className="text-base">Ryck in när ni vill eller kan</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="18px"
                  height="18px"
                  className="text-[#f9b100]"
                />
                <div>
                  <p className="text-base">Lätt att integrera med andra program</p>
                </div>
              </div>

              <button className="btn btn-yellow text-sm font-bold px-3 py-3 mr-3">
                  <Link href="/leverera-byggvaror">Anslut</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerStepGuideMobile;
