'use client';

import { useEffect, useState } from 'react';
import RequestDetails from '@/components/Supplier/request-details';
import RequestsList from '@/components/Supplier/requests-list';
import { useRouter } from 'next/router';

const SupplierRequests = ({ params }) => {
  const [selectedRequestItems, setSelectedRequestItems] = useState({});
  const router = useRouter();

  const addRemoveSelectedRequestItem = (id, quantity, budget) => {
    selectedRequestItems.hasOwnProperty(id) === false
      ? (selectedRequestItems[id] = {
          request_item_id: id,
          offeredQuantity: quantity,
          offeredPrice: budget,
        })
      : delete selectedRequestItems[id];
    setSelectedRequestItems(selectedRequestItems);
  };

  return (
    <div className='w-full bg-gray-100 px-4 py-40'>
      {!router.query.params && <RequestsList />}

      {router.query.params && router.query.params[0] && (
        <RequestDetails
          groupId={router.query.params[0]}
          params={router.query.params[0]}
          selectedRequestItems={selectedRequestItems}
          addRemoveSelectedRequestItem={addRemoveSelectedRequestItem}
        />
      )}
    </div>
  );
};

export default SupplierRequests;
