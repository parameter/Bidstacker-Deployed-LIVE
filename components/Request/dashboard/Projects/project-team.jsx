'use client';

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export const ProjectTeam = () => {
  const [editMode, setEditMode] = useState(false);
  const [team, setTeam] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddItem = () => {
    setTeam([...team, '']);
  };

  const handleDeleteItem = (index) => {
    const newTeam = team.filter((item, i) => i !== index);
    setTeam(newTeam);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="mb-2">
        <h3 className="flex justify-between items-center text-2xl font-semibold mt-4 mb-2">
          Projektteam
        </h3>
        <p className="text-sm text-gray-800 bg-gray-50 font-normal mb-4 tracking-tight p-4">
          <span className="font-semibold">Lista ditt projektteam! </span>
          <br />
        </p>
        <div className="font-light rounded-xl px-4 py-1 mb-4">
          {team.map((item, index) => (
            <ul key={index} className="flex justify-between items-center mb-2">
              <li className="flex justify-center items-center text-xl text-gray-800 font-normal mb-4 tracking-tight">
                <CheckCircleIcon className="h-6 w-6 stroke-2 mr-2" />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};
