import { useState, useEffect } from 'react';
import MailIcon from '../../public/assets/svg/MailIcon';
import PhoneIcon from '../../public/assets/svg/PhoneIcon';
import general_settings from '@/content-json/general-settings-json';
import Lottie from 'lottie-react';
import SuccessAnimation from '@/components/ThankYouNotice/SuccessAnimation.json';
 
const ThankYouNotice = ({ sending, content }) => {
    const [show, setShow] = useState(false);
  
    useEffect(() => {
        if (sending === false) {
            setShow(true);
        }
    },[sending]);

    if (!show) {
        return null;
    }

    const closeMe = (target) => {
        if (target.id === 'close_thankyou_modal') {
            setShow(false);
        }
    }
 
    return (<div id="close_thankyou_modal" onClick={(event) => { closeMe(event.target); }} className="fixed left-0 top-0 w-full h-full bg-[#282623a0] z-40">
           <div className="absolute flex flex-row py-6 px-6 left-[50%] top-[50%] w-[calc(100%-40px)] bg-white tablet:w-auto -translate-x-1/2 -translate-y-1/2 animated_neon_gradient rounded-3xl z-50">

            <div onClick={(event) => { setShow(false); }} className="absolute top-4 right-6 text-xl cursor-pointer text-gray-creamy-dark border-gray-creamy-dark hover:border-b-2 z-40">X Stäng</div>

            <div class="relative m-0 tablet:m-4 tablet:m-0 flex flex-col tablet:flex-row w-full tablet:w-auto">
                <div className="relative px-8 py-8 left-0 top-0 bg-white w-full min-h-[330px] w-1/2 tablet:min-w-[540px] rounded-xl flex flex-col order-1 tablet:order-0">

                    {/* <div className="absolute right-0 bottom-0 bg-[url(/bidstacker-lotta.png)] bg-no-repeat bg-right-bottom h-full w-1/2 bg-auto"></div> */}
                    <div className="pr-0 tablet:pr-12">
                        <h4 className="text-2xl tablet:text-4xl text-gray-creamy-dark font-bold mb-2 tablet:mb-8 drop-shadow-md shadow-black">Tack!</h4>
                        <p className="text-xl tablet:text-2xl text-gray-creamy-dark font-bold drop-shadow-md shadow-black">{content}</p>
                    </div>

                    <div className="flex flex-col mobile:flex-row pr-7 mt-12">
                        <div className="flex gap-2 items-center mr-12 mb-4 tablet:mb-8">
                            <MailIcon className="w-5 h-5 text-yellow" />
                            <p className="link link-yellow inline-block cursor-pointer">
                            {general_settings.email}
                            </p>
                        </div>

                        <div className="flex gap-2 items-center mb-0 tablet:mb-8">
                            <PhoneIcon className="w-5 h-5 text-yellow" />
                            <p className="link link-yellow inline-block cursor-pointer">
                            {general_settings.telephone}
                            </p>
                        </div>
                    </div>
     
                </div>
 
                <div className="flex flex-row justify-center min-w-[120px] w-full tablet:w-1/2 tablet:min-w-[240px] mb-8 tablet:mb-0 order-0 tablet:order-1">
                    <div className="flex flex-row justify-items-center w-full max-w-[200px] tablet:w-full">
                        <Lottie animationData={SuccessAnimation} loop={true} />
                    </div>
                </div>
            </div>

         </div>
     </div>);
};

export default ThankYouNotice;