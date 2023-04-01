import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const SelectedDeliveryInfo = ({
  deliveryItem,
  onClose,
  info,
  selectedDelivery,
  params,
  id,
}) => {
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full h-full bg-white z-50">
      <div className="h-3/4 overflow-y-scroll">
        <div className="bg-gray-800 text-white py-4 px-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Övrig info</h2>
        </div>
        <div className="py-4 px-6">
          <p>Id: {deliveryItem?._id}</p>
          <p>Street: {deliveryItem?.street}</p>
          <p>Postal Code: {deliveryItem?.postalCode}</p>
          <p>City: {deliveryItem?.city}</p>
          <p>Info Parameter: {info}</p>
        </div>
      </div>
      <div className="bg-gray-800 text-white py-4 px-6 rounded-b-lg flex justify-center">
        <button
          className="bg-white text-gray-800 py-1 px-6 rounded-full mb-8"
          onClick={onClose}
        >
          Stäng
        </button>
      </div>
    </div>
  );
};

export default SelectedDeliveryInfo;
