'use client';
import { PencilSquareIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Modal } from './modal';

const Projects = ({ projectData, projectId, myRequests, groupId }) => {
  const [showAddedRequest, setShowAddedRequest] = useState(false);
  const [showModal, setShowModal] = useState(false);

  console.log('projectId', projectId);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const style = {
    transform: showAddedRequest ? 'rotate(180deg)' : '',
    transition: 'transform 150ms ease',
  };

  const DATA = {
    _id: '123',
    title: 'Hej',
    description: 'Hej',
    status: 'Hej',
    budget: 'Hej',
    deadline: 'Hej',
    category: 'Hej',
    skills: 'Hej',
    owner: 'Hej',
    team: 'Hej',
    createdAt: 'Hej',
    updatedAt: 'Hej',
  };

  return (
    <>
      {projectData ? (
        <div className="rounded-xl flex flex-col justify-between px-4 mobile:px-10 pb-8">
          <h1 className="text-3xl mobile:text-3xl font-semibold mb-2 mt-4 text-gray-800">
            {projectData.projectTitle}
          </h1>
          <p className="text-xs text-gray-400 mb-2">
            Skapad {projectData.createdAt.slice(0, 10)}
          </p>
          {showModal && (
            <Modal
              onClose={handleShowModal}
              myRequests={myRequests}
              projectId={projectId}
              groupId={groupId}
            />
          )}
          {/*         <div className="flex">
          <p className="text-sm font-semibold">Projekt id</p>
          <p className="text-sm mb-4">{projectData._id}</p>
        </div> */}

          <div className="bg-white px-6 py-4 rounded-xl">
            <div className="mb-3">
              <h3 className="flex justify-between items-center text-xl font-semibold mt-4 mb-1">
                Projektbeskrivning
                <PencilSquareIcon className="h-6 w-6 stroke-2" />
              </h3>
              <div className="h-12 bg-gray-50 font-light rounded-xl px-2 py-1">
                asdfdsa
              </div>
            </div>
            <div className="mb-2">
              <h3 className="flex justify-between items-center text-xl font-semibold mt-4 mb-1">
                Projektbehov
                <PencilSquareIcon className="h-6 w-6 stroke-2" />
              </h3>
              <div className="h-12 bg-gray-50 font-light rounded-xl px-2 py-1">
                asdfdsa
              </div>
            </div>
            <div className="mb-6">
              <h3 className="flex justify-between items-center text-xl font-semibold mt-4 mb-1">
                Projektkategorier
                <PencilSquareIcon className="h-6 w-6 stroke-2" />
              </h3>
              <section>
                <p>Får innehålla:</p>
                <div className="flex">
                  <p className="max-w-max bg-black pt-1 pb-1 px-2 mr-1 text-xs rounded-xl text-white font-bold">
                    Virke
                  </p>
                  <p className="max-w-max bg-black pt-1 pb-1 px-2 mr-1 text-xs rounded-xl text-white font-bold">
                    Virke
                  </p>
                </div>
              </section>
              <section>
                <p>Får inte innehålla:</p>
                <div className="flex">
                  <p className="max-w-max bg-black pt-1 pb-1 px-2 mr-1 text-xs rounded-xl text-white font-bold">
                    Virke
                  </p>
                  <p className="max-w-max bg-black pt-1 pb-1 px-2 mr-1 text-xs rounded-xl text-white font-bold">
                    Virke
                  </p>
                </div>
              </section>
            </div>

            <section className="flex-wrap mt-2 mb-4">
              <div className="flex flex-row justify-center gap-4 mb-4">
                <button
                  onClick={handleShowModal}
                  className="h-12 bg-gray-100 font-semibold items-center w-full p-2  rounded-md text-gray-700 text-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:transition ease-in-out"
                >
                  <div>{'Koppla en förfrågan'}</div>
                </button>
                <button className="flex flex-row justify-center h-12 bg-gray-100 font-semibold items-center w-full p-2  rounded-md text-gray-700 text-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:transition ease-in-out">
                  <div>{'Ny projektförfrågan'}</div>
                </button>
              </div>
              <button
                onClick={() => setShowAddedRequest(!showAddedRequest)}
                className="flex flex-row justify-center h-12 bg-gray-100 font-semibold items-center w-full p-2  rounded-md text-gray-700 text-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:transition ease-in-out"
              >
                <div>
                  {showAddedRequest ? 'Kopplade förfrågningar' : 'Dölj lista'}
                </div>
                <ChevronDownIcon
                  className="h-5 w-5 ml-1 stroke-2"
                  style={style}
                />
              </button>
            </section>
            {showAddedRequest && (
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-sm font-semibold">Projekt id</p>
                  <p className="text-sm mb-4">{projectData._id}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-sm font-semibold">Projekt id</p>
                  <p className="text-sm mb-4">{projectData._id}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-sm font-semibold">Projekt id</p>
                  <p className="text-sm mb-4">{projectData._id}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col mt-4">
              <div className="flex justify-between items-center"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-semibold">Inget projekt hittat</p>
        </div>
      )}
    </>
  );
};

export default Projects;
