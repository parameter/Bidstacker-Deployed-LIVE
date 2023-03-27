'use client';

import { useRef } from 'react';
import { useSupplierContext } from 'context/supplier-context';
import RequestItem from './request-item';

export default function RequestsList() {
  const { requests, getRequests, setCategories } = useSupplierContext();
  const catsForm = useRef();
  // console.log(requests);

  return (
    <div className="w-full h-full bg-gray-100 px-4 py-10">
      <div className="max-w-[800px] bg-white rounded-xl pt-10 mx-auto pb-10">
        <div className="flex flex-col justify-center px-10">
          <h1 className="text-2xl font-bold mb-10">Se inkomna förfrågningar</h1>
          {/* <div>
          <h3 className="m-4">Senaste förfrågningarna</h3>
        </div> */}
          <form
            onChange={() => {
              let checked = catsForm.current.querySelectorAll('input:checked');
              let cats = [];
              checked.forEach((item) => {
                cats.push(item.value);
              });
              setCategories(cats);
            }}
            ref={catsForm}
            className="flex items-center gap-4 mb-20"
          >
            <label>
              <input name="category" value="cat0000" type="checkbox" />
              <span className="ml-1">Byggnadsvaror</span>
            </label>
            <label>
              <input name="category" value="cat0001" type="checkbox" />
              <span className="ml-1">Kontorsvaror</span>
            </label>
            <button
              className="bg-black text-yellow-light border-none px-4 py-2 font-semibold rounded-2xl"
              onClick={() => getRequests()}
              type="button"
            >
              Find requests ...
            </button>
          </form>
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-8 cursor-pointer pb-4">
            {requests &&
              Object.keys(requests).map((key) => {
                return (
                  <RequestItem
                    key={key}
                    groupId={key}
                    request={requests[key]}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
