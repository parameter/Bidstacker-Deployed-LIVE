import BgArrowsDesktop from '../../../public/assets/svg/BgArrowsDesktop';
import SendIcon from '../../../public/assets/svg/SendIcon';
import Link from 'next/link';

const BuyerStepGuideDesktop = ({ steps }) => {
  return (
    <div className="bg-gray-light dark:bg-gray-light-dark pt-24">
      <div className="flex flex-col items-center container mx-auto">
        <div className="flex flex-col justify-center items-center">
          <h2 className="px-10 mb-20">{steps.title}</h2>
        </div>
        <div className="relative w-[692px] h-[1250px]">
          <div className="relative w-full h-full flex justify-between">
            <div className="absolute top-10 left-[14%]">
              <h3 className="font-bold mb-5">{steps.steps[0].title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <p className="text-xl">{steps.steps[0].rows[0]}</p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <p className="text-xl">{steps.steps[0].rows[1]}</p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <p className="text-xl">{steps.steps[0].rows[2]}</p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <p className="text-xl">{steps.steps[0].rows[3]}</p>
              </div>
              
              {/*
              <Link href="/hitta-byggvaror"
                  className="text-center text-white font-semibold z-10 pointer-events-none"
                >
                <button className="btn btn-yellow px-8 py-4 mr-6">
                  Anslut som inköpare
                </button>
              </Link>
               
                <button className="px-8 py-4 btn btn-white">
                <Link
                  href="/"
                  className="text-center text-black font-semibold z-10 pointer-events-none"
                >
                  Skapa Förfrågan
                </Link>
              </button>
              */}
              
            </div>
            <div className="absolute -right-28 top-20">
              <img
                src="/assets/svg/kopa-varor-steg-1.svg"
                alt="Köpa varor"
                width="320"
                height="336"
              />
            </div>
            <div className="absolute bottom-[40%] -right-20">
              <h3 className="font-bold text-3xl mb-5">
                {steps.steps[1].title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <p className="text-xl">{steps.steps[1].rows[0]}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <p className="text-xl">{steps.steps[1].rows[1]}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <p className="text-xl">{steps.steps[1].rows[2]}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <p className="text-xl">{steps.steps[1].rows[3]}</p>
              </div>
              {/*
              <Link href="/bli-byggvaruhandlare"
                className="text-center text-white font-semibold z-10 pointer-events-none"
              >
                <button className="btn btn-yellow px-8 py-4 mr-6">
                  Anslut som återförsäljande
                </button>
              </Link>
            */}
              
            </div>
            <div className="absolute bottom-[38%] left-0">
              <img
                src="/assets/svg/salja-varor-steg-2.svg"
                alt="Sälja varor"
                width="260"
                height="303"
              />
            </div>

            <div className="absolute bottom-[10%] left-3">
              <h3 className="font-bold text-3xl mb-5">
                {steps.steps[2].title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <div className="max-w-[350px]">
                  <p className="text-xl">{steps.steps[2].rows[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <div className="max-w-[350px]">
                  <p className="text-xl">{steps.steps[2].rows[1]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <div className="max-w-[350px]">
                  <p className="text-xl">{steps.steps[2].rows[2]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SendIcon
                  width="24px"
                  height="24px"
                  className="text-[#f9b100]"
                />
                <div className="max-w-[350px]">
                  <p className="text-xl">{steps.steps[2].rows[3]}</p>
                </div>
              </div>
              {/*   
              <Link
                href="/leverera-byggvaror"
                className="text-center text-white font-semibold z-10 pointer-events-none"
              >
                <button className="btn btn-yellow px-8 py-4 mr-6">
                  Anslut som bud
                </button>
              </Link>
              */}
            </div>
            <div className="absolute bottom-[6%] -right-12">
              <img
                src="/assets/svg/leverera-varor-steg-3.svg"
                alt="Leverera varor"
                width="340"
                height="325"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerStepGuideDesktop;
