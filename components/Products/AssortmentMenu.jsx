import React from 'react';

const assortments = [
  'Badrum & kök',
  'Byggmaterial',
  'Dörrar & fönster',
  'Elinstallation',
  'Elartiklar',
  'Fästelement',
  'Golv, vägg & trappa',
  'Hem, trädgård & fritid',
  'Kläder & skyddsutrustning',
  'Verktyg & maskiner',
  'Färg',
];

const AssortmentMenu = () => {
  return (
    <div>
      <h4 className='text-sm text-gray-light-dark uppercase mb-2'>Sortiment</h4>
      <ul className='flex flex-col gap-1'>
      {assortments.map((ass, index) => (
        <li key={index} className="hover:bg-yellow hover:text-white duration-100 rounded py-1 pl-1 cursor-pointer">{ass}</li>
      ))}
      </ul>
    </div>
  );
};

export default AssortmentMenu;
