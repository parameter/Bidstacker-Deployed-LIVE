import React from 'react';

const Team = () => {
  return (
    <div className='bg-gray-creamy-dark py-[100px]'>
      <h2 className='pb-[80px] text-white'>Möt teamet</h2>
      <div className='container mx-auto flex flex-col desktop:flex-row gap-10 desktop:gap-0 desktop:justify-around'>
        <div className='flex flex-col items-center'>
          <img
            src='/assets/img/staff/amine.jpg'
            alt='avatar'
            className='rounded-full w-[250px] h-[250px] desktop:w-[132px] desktop:h-[132px] mb-3 border-4 border-white drop-shadow-2xl'
          />
          <p className='text-[24px] text-white font-bold leading-none'>Amine Smires</p>
          <p className='text-slate-500 text-white'>VD</p>
          {/* <p>email@email.com</p> */}
        </div>
        <div className='flex flex-col items-center'>
          <img
            src='/assets/img/staff/paer.jpg'
            alt='avatar'
            className='rounded-full w-[250px] h-[250px] desktop:w-[132px] desktop:h-[132px] mb-3 border-4 border-white drop-shadow-2xl'
          />
          <p className='text-[24px] text-white font-bold leading-none'>Pär Henriksson</p>
          <p className='text-slate-500 text-white'>CTO</p>
          {/* <p>email@email.com</p> */}
        </div>
        <div className='flex flex-col items-center'>
          <img
            src='/assets/img/staff/cemil.jpg'
            alt='avatar'
            className='rounded-full w-[250px] h-[250px] desktop:w-[132px] desktop:h-[132px] mb-3 border-4 border-white drop-shadow-2xl'
          />
          <p className='text-[24px] text-white font-bold leading-none'>Cemil Ülay</p>
          <p className='text-slate-500 text-white'>Utvecklare</p>
          {/* <p>email@email.com</p> */}
        </div>
        <div className='flex flex-col items-center'>
          <img
            src='/assets/img/staff/heidi.jpg'
            alt='avatar'
            className='rounded-full w-[250px] h-[250px] desktop:w-[132px] desktop:h-[132px] mb-3 border-4 border-white drop-shadow-2xl'
          />
          <p className='text-[24px] text-white font-bold leading-none'>Heidi Dragomir</p>
          <p className='text-slate-500 text-white'>Utvecklare</p>
          {/* <p>email@email.com</p> */}
        </div>
        <div className='flex flex-col items-center'>
          <img
            src='/assets/img/staff/henrik.jpg'
            alt='avatar'
            className='rounded-full w-[250px] h-[250px] desktop:w-[132px] desktop:h-[132px] mb-3 border-4 border-white drop-shadow-2xl'
          />
          <p className='text-[24px] text-white font-bold leading-none'>Henrik Berglund</p>
          <p className='text-slate-500 text-white'>Utvecklare</p>
          {/* <p>email@email.com</p> */}
        </div>
      </div>
    </div>
  );
};

export default Team;
