'use client';
import ReactDOM from 'react-dom';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ProjectRequestItem } from './project-request-item';
import { useRequestContext } from 'context/request-context';

export const Modal = ({ onClose, myRequests, projectId, myProject }) => {
  return ReactDOM.createPortal(
    <div className="fixed z-10 top-20 left-0 right-0 bottom-0 flex justify-center items-center m-2">
      <div className="w-11/12 tablet:w-3/6 mobile:w-5/6 absolute border bg-white shadow-2xl p-8 mobile:p-12 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-2xl">Koppla förfrågningar</h4>
          <button onClick={onClose}>
            <XMarkIcon className="h-8 w-8 stroke-2" />
          </button>
        </div>
        <p className="text-sm text-gray-800 bg-gray-200 font-normal mb-4 tracking-tight p-4">
          <InformationCircleIcon className="h-6 w-6 stroke-2" />
          <span className="font-semibold">
            Koppla förfrågningar till ditt projekt
          </span>
          <br />
          Klicka på en förfrågan för att koppla, klicka på den igen för att ta
          bort den från projektet.
        </p>
        {Object.keys(myRequests).length === 0 ? (
          <div
            key={myRequests.length}
            className="flex flex-col justify-center items-center font-semibold text-lg text-gray-300 mt-10"
          >
            <QuestionMarkCircleIcon className="h-8 w-8 mobile:h-14 mobile:w-14 text-gray-400" />
            <h4 className="text-gray-400">Inga förfrågningar...</h4>
          </div>
        ) : (
          Object.keys(myRequests).map((groupId, index) => {
            const request = myRequests[groupId];
            return (
              <ProjectRequestItem
                key={index}
                request={request}
                groupId={groupId}
                index={index}
                projectId={projectId}
                myProject={myProject}
              />
            );
          })
        )}
      </div>
    </div>,
    document.body
  );
};
