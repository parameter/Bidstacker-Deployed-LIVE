import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRequestContext } from 'context/request-context';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import {
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

export const Modal = ({ onClose, myRequests, projectId }) => {
  const { addRequestToProjectByGroupId, deleteRequestFromProject } =
    useRequestContext();

  const ProjectRequestItem = ({ request, groupId, index }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleAddRequest = () => {
      setIsClicked(!isClicked);

      if (!isClicked) {
        addRequestToProjectByGroupId(projectId, groupId);
      } else {
        deleteRequestFromProject(projectId, groupId);
      }
    };

    return (
      <button
        className="flex items-end justify-between"
        key={index}
        onClick={() => handleAddRequest(index)}
      >
        <div className="w-full px-6 py-2 text-gray-800 mobile:py-4 bg-gray-100 shadow-lg rounded-xl mobile:mb-4 hover:bg-gray-200 transition ease-in-out cursor-pointer">
          {isClicked ? (
            <div className="absolute left-[0px] z-200 text-green p-4 rounded-full">
              <CheckBadgeIcon className="h-16 w-16 stroke-1.5" />
            </div>
          ) : null}
          <div className="flex items-center justify-start">
            <div className="bg-gray-50 p-4 rounded-full">
              <ClipboardDocumentListIcon className="h-10 w-10 mobile:h-14 mobile:w-14 stroke-1.5" />
            </div>
            <section className="w-full flex relative items-center justify-between">
              <figure className="w-full flex flex-col ml-2">
                {/* <span className="absolute -left-[72px] -top-3 bg-[#ffb4b4] h-4 px-2 pt-0.5 pb-0.5 rounded-xl"></span> */}
                <h5 className="font-sans text-lg mobile:text-2xl font-semibold text-light">
                  {request.request_metadata.projectNumber}{' '}
                </h5>
                <p className="text-xs mobile:text-sm text-gray-400 dark:text-gray-400 mb-2">
                  {request.request_items.length} artiklar &nbsp;•&nbsp; Skapad{' '}
                  {request.request_metadata.createdAt.slice(0, 10)}{' '}
                </p>
              </figure>
            </section>
          </div>
        </div>
      </button>
    );
  };

  return ReactDOM.createPortal(
    <div className="fixed z-100 -top-10 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="absolute border bg-white shadow-2xl p-12 rounded-xl">
        <div className="flex justify-between">
          <h4 className="font-semibold text-2xl">Koppla förfrågningar</h4>
          <button onClick={onClose}>
            <XMarkIcon className="h-8 w-8 stroke-2" />
          </button>
        </div>
        <>
          {Object.keys(myRequests, index).length === 0 ? (
            <div key={index} className="flex flex-col justify-center items-center font-semibold text-lg text-gray-300 mt-10">
              <QuestionMarkCircleIcon className="h-14 w-14 text-gray-400" />
              <h4 className="text-gray-400">Inga förfrågningar...</h4>
            </div>
          ) : (
            Object.keys(myRequests).map((groupId, index) => {
              return (
                <ProjectRequestItem
                  key={index}
                  request={myRequests[groupId]}
                  groupId={groupId}
                  index={index}
                />
              );
            })
          )}
        </>
      </div>
    </div>,
    document.body
  );
};
