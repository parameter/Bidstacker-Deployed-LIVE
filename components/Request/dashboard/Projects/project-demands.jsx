'use client';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  BackspaceIcon,
  CursorArrowRaysIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Suspense, useState } from 'react';
const LoadingIndicator = () => <div>Loading...</div>;

export const Demands = ({ isPrelAdmin }) => {
  const [demands, setDemands] = useState(['']);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showInfo, setShowInfo] = useState(true);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddItem = () => {
    setDemands([...demands, '']);
  };

  const handleDeleteItem = (index) => {
    const newDemands = demands.filter((item, i) => i !== index);
    setDemands(newDemands);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="mb-2">
        <h3 className="flex justify-between items-center text-2xl font-semibold mt-4 mb-2">
          Projektkrav
          <button
            onClick={() => {
              setShowInfo(!showInfo);
            }}
          >
            <InformationCircleIcon className="h-6 w-6 stroke-2 mobile:mr-2" />
          </button>
        </h3>

        {isPrelAdmin && showInfo && (
          <p className="text-sm text-gray-800 bg-gray-200 mb-4 tracking-tight p-4">
            <span className="flex items-start mobile:items-center flex-col mobile:flex-row font-semibold">
              <InformationCircleIcon className="h-6 w-6 stroke-2 mobile:mr-2" />
              <p>Lista dina projektbehov!</p>
            </span>
            <br />
            <p className="text-sm font-normal">
              Vad behöver du för material? Vad behöver du för verktyg? Vad
              behöver du för utrustning? Vad behöver du för kompetens? Vad
              behöver du för hjälp? Vad behöver du för information? Vad behöver
              du för stöd? Vad behöver du för utbildning? Vad behöver du för
              råd?
            </p>
          </p>
        )}

        <div className="font-light rounded-xl px-4 py-1 mb-4">
          {demands.map((item, index) => (
            <ul key={index} className="flex justify-between items-center mb-2">
              <li className="flex justify-center items-center text-xl text-gray-800 font-normal mb-4 tracking-tight">
                <CheckCircleIcon className="h-6 w-6 stroke-2 mr-2" />
                <input
                  type="text"
                  className={`border ${
                    editMode ? 'bg-gray-200' : 'bg-white'
                  } border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  value={demands[index]}
                  onChange={(e) => {
                    const newDemand = [...demands];
                    newDemand[index] = e.target.value;
                    setDemands(newDemand);
                  }}
                  disabled={!editMode}
                />
                {editMode && (
                  <button
                    className="flex justify-center items-center bg-purple-300 px-1 py-1 rounded-full text-white font-semibold ml-2 hover:bg-purple-400"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <XMarkIcon className="h-6 w-6 stroke-2" />
                  </button>
                )}
              </li>
            </ul>
          ))}
        </div>

        {isPrelAdmin && (
          <>
            <section className="flex">
              <button
                className="flex bg-purple-300 py-2 px-2 rounded text-white font-semibold mb-4 mr-2 hover:bg-purple-400"
                onClick={handleEditMode}
              >
                <PencilSquareIcon className="h-6 w-6 stroke-1.5 mr-2" />
                {editMode ? 'Klar' : 'Ändra'}
              </button>
              <button
                className="flex bg-purple-300 py-2 px-2 rounded text-white font-semibold mb-4 hover:bg-purple-400"
                onClick={handleAddItem}
              >
                <PencilSquareIcon className="h-6 w-6 stroke-1.5 mr-2" />
                {'Lägg till'}
              </button>
            </section>
          </>
        )}
      </div>
    </Suspense>
  );
};
