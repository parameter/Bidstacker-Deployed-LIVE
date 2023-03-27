'use client';

import { useState } from 'react';
import { XCircleIcon, PaperClipIcon } from '@heroicons/react/24/outline';

const FileUpload = ({
  id,
  setFiles,
  files,
  generateRandomString,
  requests,
  setRequests,
}) => {
  const [message, setMessage] = useState();

  const printImages = () => {
    // Find index of the request
    const updateRequestsIndex = requests.findIndex((index) => index.id === id);
    // New variable with the request
    const updateRequest = requests[updateRequestsIndex];

    return updateRequest?.images?.map((file, key) => {
      return (
        <div
          key={key}
          className="bg-gray-100 w-[300px] flex justify-between p-2 overflow-hidden"
        >
          <span className="overflow-hidden">
            {file?.images?.name?.slice(0, 30)}
          </span>
          <XCircleIcon
            onClick={() => {
              removeImage(file);
            }}
            className="w-5 text-red-600 cursor-pointer"
          />
        </div>
      );
    });
  };

  const handleFile = (e) => {
    setMessage('');
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];

      // see so the user dont add same file, will use later
      const fileName = file[i]['name'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      // Find index of the request
      const updateRequestsIndex = requests.findIndex(
        (index) => index.id === id
      );
      // New variable with the request
      const updateRequest = requests[updateRequestsIndex];

      if (validImageTypes.includes(fileType)) {
        // Create random string
        const newId = generateRandomString(8);

        // Add the image
        updateRequest.images.push({ id: newId, images: file[i] });

        /* setFiles((current) => [...current, { id: newId, images: file[i] }]); */
      } else {
        setMessage('Tyvärr inte tillåten bildfil.');
      }
    }
  };

  /* const handleFile = (e) => {
    setMessage('');
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const fileName = file[i]['name'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      if (validImageTypes.includes(fileType)) {
        
        // Create random string
        const newId = generateRandomString(8);

        // Add the image
        updateRequest.images.push({ id: newId, images: file[i] });

        setFiles((current) => [...current, { id: newId, images: file[i] }]);
      } else {
        setMessage('Tyvärr inte tillåten bildfil.');
      }
    }
  }; */

  const removeImage = (file) => {
    // Find index of the request
    const updateRequestsIndex = requests.findIndex((index) => index.id === id);
    // New variable with the request
    const updateRequest = requests[updateRequestsIndex];

    const images = updateRequest.images;
    const updatedImages = images.filter((item) => item.id !== file.id);
    updateRequest.images = updatedImages;
    setRequests([...requests]);

    /* setRequests((current) => current.images.filter((img) => img.id !== id )) */
  };

  // console.log(requests[0].images.length);

  return (
    <>
      <div className="bg-white rounded-md">
        <div className="h-[60px] w-full relative items-center">
          <input
            name="files"
            type="file"
            onChange={handleFile}
            className="h-full w-full opacity-0 z-10 absolute"
            multiple
          />
          <div className="h-full w-full bg-orange rounded-lg absolute z-1 flex justify-center items-center top-0">
            <div className="flex items-center gap-2 text-white">
              <PaperClipIcon className="w-5" />
              <span className="uppercase font-medium text-base">
                Bifoga filer
              </span>
            </div>
          </div>
        </div>
        <span className="w-[300px] flex justify-center items-center text-[12px] mb-1 text-red-500">
          {message}
        </span>
        <div className="flex flex-col gap-2 mt-2">{printImages()}</div>
      </div>
    </>
  );
};

export default FileUpload;
