import { useState, useEffect } from 'react';

const ThankYouNotice = ({ sending }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (sending === false) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 4000)
        }
    },[sending]);

    if (!show) {
        return null;
    }

    return (<div className="absolute left-0 top-0 w-full h-full bg-[#282623a0] z-20">
           <div className="absolute py-12 px-12 left-[50%] top-[50%] bg-white  -translate-x-1/2 -translate-y-1/2 animated_neon_gradient">

            <div className="relative px-12 py-8 left-0 top-0 bg-white w-full min-h-[330px] min-w-[640px]">

             <div className="absolute right-0 bottom-0 bg-[url(/bidstacker-lotta.png)] bg-no-repeat bg-right-bottom h-full w-1/2 bg-auto"></div>
             <h4 className="text-4xl text-gray-creamy-dark font-bold mb-8 drop-shadow-md shadow-black">Tack!</h4>
             <p className="text-2xl text-gray-creamy-dark font-bold drop-shadow-md shadow-black">Hörs snart.</p>

            </div>
         </div>
     </div>);
};

export default ThankYouNotice;