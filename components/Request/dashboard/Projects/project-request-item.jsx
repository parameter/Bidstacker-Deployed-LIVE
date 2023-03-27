'use client';
import {
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useRequestContext } from 'context/request-context';
import { LoadingDots } from '@/components/LoadingDots';

export const ProjectRequestItem = ({
  request,
  groupId,
  index,
  projectId,
  myProject,
}) => {
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const {
    addRequestToProjectByGroupId,
    deleteRequestFromProject,
    loadingIndex,
    setLoadingStatus,
  } = useRequestContext();

  const isLoading = loadingIndex[groupId];

  useEffect(() => {
    if (myProject.requests.some((request) => request.groupId === groupId)) {
      setShowCheckIcon(true);
    } else {
      setShowCheckIcon(false);
    }
  }, [groupId, myProject.requests]);

  const handleAddRequest = () => {
    setLoadingStatus(groupId, true);

    setTimeout(() => {
      if (
        !myProject.requests.some((request) => request.groupId === groupId) ||
        !showCheckIcon
      ) {
        addRequestToProjectByGroupId(projectId, groupId);
        console.log('ADD');
        setShowCheckIcon(true);
      } else {
        deleteRequestFromProject(projectId, groupId);
        console.log('DELETE');
        setShowCheckIcon(false);
      }
    }, 1000);
  };

  return (
    <button
      className="flex justify-center items-center w-full mb-4"
      key={index}
      onClick={() => handleAddRequest()}
    >
      <div className="w-2/12 mobile:w-3/12 flex justify-center items-center">
        {isLoading && <LoadingDots className="mr-2 mobile:mr-0" />}
        {showCheckIcon && !isLoading && (
          <CheckBadgeIcon className="h-12 w-12 text-green mobile:h-14 mobile:w-14 tablet:h-16 tablet:w-16 stroke-1.5" />
        )}
      </div>
      <div className="w-10/12 mobile:w-9/12 flex items-center justify-center px-0 py-2 text-gray-800 mobile:py-4 bg-gray-100 shadow-lg rounded-xl hover:bg-gray-200 transition ease-in-out cursor-pointer">
        <div className="bg-gray-50 p-2 mobile:p-3 rounded-full mr-2">
          <ClipboardDocumentListIcon className="h-8 w-8 mobile:h-12 mobile:w-12 stroke-1.5" />
        </div>
        <figure className="flex-col ml-2">
          {/* <span className="absolute -left-[72px] -top-3 bg-[#ffb4b4] h-4 px-2 pt-0.5 pb-0.5 rounded-xl"></span> */}
          <h5 className="text-lg mobile:text-2xl font-semibold text-light">
            {request.request_metadata.projectNumber}{' '}
          </h5>
          <p className="flex flex-col mobile:flex-row text-xs mobile:text-xs tablet:text-sm tablet:mt-2 text-gray-400 dark:text-gray-400">
            <span>{request.request_items.length} artiklar &nbsp;•&nbsp;</span>
            <span>
              Skapad {request.request_metadata.createdAt.slice(0, 10)}{' '}
            </span>
          </p>
        </figure>
      </div>
    </button>
  );
};
