'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/Map/map-location'), {
  ssr: false
});

const DeliveryMap = ({ params }) => {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [myDeliveries, setMyDeliveries] = useState(null);

  useEffect(() => {
    if (myDeliveries) {
      return;
    }
    getAllDeliveries();
  }, [myDeliveries]);

  
  const getAllDeliveries = async () => {
    var deliveries = await axios.get('/api/delivery/get-deliveries');
    
    if (deliveries.data) {
      console.log('deliveriy', deliveries.data);
      setMyDeliveries(deliveries.data.deliveries);
    }
    //adding comment
  };

  console.log('myDeliveries',myDeliveries);
  
  return (
    <div className="">
      {router.query.params && <MapComponent deliveries={myDeliveries} />}
    </div>
  );
};

export default DeliveryMap;