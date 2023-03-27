"use client";

import { useState } from 'react';
import axios from 'axios';
import DeliveryPart from '@/components/Request/new-request/DeliveryPart';
import ItemsPart from '@/components/Request/new-request/ItemsPart';
import RequestSuccess from '@/components/Request/new-request/RequestSuccess';

const New = () => {
  const [activePart, setActivePart] = useState(0);
  const [requests, setRequests] = useState([]);
  const [deliveryMetaInfo, setDeliveryMetaInfo] = useState({
      type: '',
      earliest: '',
      latest: '',
      vehicle: '',
      projectNumber: '',
      marking: ''
  });
  const [deliveryPersonalInfo, setDeliveryPersonalInfo] = useState({
    contactName: '',
    contactNumber: '',
    street: '',
    extraAddress: '',
    postalCode: '',
    city: ''
  });

  const cleanPayload = (reqs) => {
    return reqs.map((item) => {
      delete item.product;
      return item;
    });
  }

  const submitRequest = (e) => {
    e.preventDefault();

    const formData = {
      metadata: {
        projectNumber: deliveryMetaInfo.projectNumber,
        marking: deliveryMetaInfo.marking
      },
      delivery: {
        deliveryType: deliveryMetaInfo.type,
        deliveryEarliest: deliveryMetaInfo.earliest,
        deliveryLatest: deliveryMetaInfo.latest,
        vehicleType: deliveryMetaInfo.vehicle
      },
      deliveryPersonalInfo: deliveryPersonalInfo,
      requests: cleanPayload(requests),
    };
    
    axios
      .post('/api/request/new', formData)
      .then(() => {
        setRequests([]);
        setActivePart(2);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      {activePart === 0 && (
        <ItemsPart
          requests={requests}
          setRequests={setRequests}
          setActivePart={setActivePart}
        />
      )}
      {activePart === 1 && (
        <DeliveryPart
          deliveryMetaInfo={deliveryMetaInfo}
          deliveryPersonalInfo={deliveryPersonalInfo}
          setDeliveryMetaInfo={setDeliveryMetaInfo}
          setDeliveryPersonalInfo={setDeliveryPersonalInfo}
          setActivePart={setActivePart}
          submitRequest={submitRequest}
        />
      )}
      {activePart === 2 && (
          <RequestSuccess />
      )}
    </>
  );
};

export default New;
