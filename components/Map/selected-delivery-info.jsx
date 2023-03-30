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
    <div className="map-container h-screen flex flex-col justify-center items-center">
      <div className="fixed bottom-0 left-0 w-full bg-white z-50 flex flex-col justify-center items-center" style={{zIndex: 2, height: "calc(100vh - 20rem)"}}>
        <div className="bg-gray-800 text-white py-4 px-6 rounded-t-lg w-full">
          <h2 className="text-xl font-bold">Övrig info</h2>
        </div>
        <div className="py-4 px-6 w-full">
          <p>Id: {deliveryItem?._id}</p> 
          <p>Street: {deliveryItem?.street}</p>
          <p>Postal Code: {deliveryItem?.postalCode}</p>
          <p>City: {deliveryItem?.city}</p> 
          <p>Info Parameter: {info}</p> 
        </div>
        <div className="bg-gray-800 text-white py-4 px-6 rounded-b-lg w-full">
          <button className="bg-white text-gray-800 py-1 px-6 rounded-full mb-8" onClick={onClose}>Stäng</button>
        </div>
      </div>
    </div>
  )
}


export default SelectedDeliveryInfo;
