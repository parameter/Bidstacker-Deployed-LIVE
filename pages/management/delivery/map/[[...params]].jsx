import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const MapComponent = dynamic(() => import('@/components/Map/map-location'), {
  ssr: false
});

const SelectedDeliveryInfo = dynamic(() => import('@/components/Map/selected-delivery-info'), {
  ssr: false
});

function DeliveryMap() {
  const router = useRouter();
  const [myDeliveries, setMyDeliveries] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    if (myDeliveries) {
      return;
    }
    getAllDeliveries();
  }, [myDeliveries]);

  const getAllDeliveries = async () => {
    var deliveries = await axios.get('/api/delivery/get-deliveries');
    
    if (deliveries.data) {
      setMyDeliveries(deliveries.data.deliveries);
      setSelectedDelivery(deliveries.data.deliveries[0]);
    }
  };
  
  return (
    <div>
      {myDeliveries && (
        <MapComponent 
          params={router.query.params}
          deliveries={myDeliveries} 
          setSelectedDelivery={setSelectedDelivery} 
          id={router.query.params[0]}
        />
      )}
      {!router.query.params && router.query.params && selectedDelivery === "info" && (
        <SelectedDeliveryInfo 
          params={router.query.params}
          deliveryItem={selectedDelivery} 
          onClose={() => setSelectedDelivery(null)} 
          id={router.query.params[1]}

        />
      )}
    </div>
  )
  
}

export default DeliveryMap;
