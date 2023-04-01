'use client';
import {
  ChevronDownIcon,
  PaperClipIcon,
  CheckBadgeIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Modal } from './modal';
import { useRequestContext } from 'context/request-context';
import { ProjectDescription } from './project-description';
import { Demands } from './project-demands';
import { ProjectTeam } from './project-team';
import Link from 'next/link';
import { LoadingDots } from '@/components/LoadingDots';

const Projects = ({ projectData, projectId, groupId, myProject, getMyProjects }) => {
  const [showAddedRequest, setShowAddedRequest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { getMyRequests, myRequests, isPrelAdmin } = useRequestContext();

  const style = {
    transform: showAddedRequest ? 'rotate(180deg)' : '',
    transition: 'transform 150ms ease',
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
    getMyProjects();
  };

  const handleShowAddedRequest = () => {
    setShowAddedRequest(!showAddedRequest);
    getMyProjects();
  };

  useEffect(() => {
    getMyRequests();
  }, [getMyRequests]);

  return (
    <>
      {projectData ? (
        <>
          <div className="rounded-xl flex flex-col justify-between md:px-10 pb-8">
            <section className="rounded-xl p-6 mb-4 border-2 bg-gray-200">
              <h1 className="text-3xl md:text-3xl font-semibold mb-2 mt-4 text-gray-800">
                {projectData.projectTitle}
              </h1>
              <p className="text-xs text-gray-400 mb-2">
                Skapad {projectData.createdAt.slice(0, 10)}
              </p>
              <div className="flex flex-col justify-center items-center">
                <ProjectTeam />
              </div>
            </section>

            {showModal && (
              <Modal
                onClose={handleShowModal}
                myRequests={myRequests}
                projectId={projectId}
                groupId={groupId}
                myProject={myProject}
              />
            )}
            <div className="bg-white px-6 py-4 rounded-xl">
              <section className="mb-3">
                <ProjectDescription isPrelAdmin={isPrelAdmin} />
              </section>
              <section>
                <Demands isPrelAdmin={isPrelAdmin} />
              </section>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mt-4 mb-1">
                  Projektkategorier
                </h3>
                <section className="flex justify-between">
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
                </section>
              </div>
              <section className="flex-wrap mt-2 mb-4">
                <div className="flex flex-row justify-center gap-4 mb-4">
                  {isPrelAdmin && (
                    <>
                      <button
                        onClick={handleShowModal}
                        className="h-12 bg-gray-100 font-semibold items-center w-full p-2  rounded-md text-gray-700 text-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:transition ease-in-out"
                      >
                        <div>{'Koppla en förfrågan'}</div>
                      </button>
                      <button className="flex flex-row justify-center h-12 bg-gray-100 font-semibold items-center w-full p-2  rounded-md text-gray-700 text-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:transition ease-in-out">
                        <div>{'Ny projektförfrågan'}</div>
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={handleShowAddedRequest}
                  className="flex flex-row justify-center h-12 bg-gray-100 font-semibold items-center w-full p-2  rounded-md text-gray-700 text-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:transition ease-in-out"
                >
                  <div>
                    {showAddedRequest ? 'Dölj lista' : 'Kopplade förfrågningar'}
                  </div>
                  <ChevronDownIcon
                    className="h-5 w-5 ml-1 stroke-2"
                    style={style}
                  />
                </button>
              </section>
              {showAddedRequest &&
                Object.values(myRequests).map((keyItem, index) => (
                  <>
                    <div
                      className="flex flex-row justify-between items-center"
                      key={index}
                    >
                      <div className="flex flex-col">
                        <p className="font-semibold">
                          {keyItem.request_metadata.projectNumber}
                        </p>
                        <p className="text-sm text-left">
                          {keyItem.request_metadata.marking}
                        </p>
                      </div>
                      <div className="flex flex-row justify-center gap-4 mb-4">
                        <Link
                          className="cursor-pointer"
                          href={`/management/request/my-requests/${keyItem.request_metadata.groupId}`}
                        >
                          <button className="flex flex-row justify-center h-12 bg-orange font-semibold items-center w-full p-2  rounded-md text-gray-700 text-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:transition ease-in-out">
                            <PaperClipIcon
                              className="h-5 w-5 ml-1 mr-1 stroke-2"
                              style={style}
                            />
                            <div>{'Se förfrågan'}</div>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                ))}

              <div className="flex flex-col mt-4">
                <div className="flex justify-between items-center"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-semibold">Inget projekt hittat</p>
        </div>
      )}
    </>
  );
};

export default Projects;
