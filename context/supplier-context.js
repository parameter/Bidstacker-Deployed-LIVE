'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import _ from 'underscore';
import axios from 'axios';
import { filterRequests } from '@/lib/filter-requests';
import filterNegotiations from '@/lib/filter-negotiations';

export const SupplierContext = createContext({});

export const SupplierProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [requests, setRequests] = useState({});
  const [activePageTab, setActivePageTab] = useState(0);
  const [myNegotiations, setMyNegotiations] = useState([]);

  const getRequests = async () => {
    const formData = {
      categories: categories,
    };
    const res = await axios.get('/api/supplior/requests', { params: formData });

    const requests = filterRequests(res.data)

    // Save requests to local storage
    // localStorage.setItem("requests", JSON.stringify(requests));

    setRequests(requests);
  };

  const getMyOffers = useCallback(async () => {
    const res = await axios.get('/api/supplior/myRequests');
    const negotiations = filterRequests(res.data);
    setMyNegotiations(negotiations);
  }, []);

  // Current date to show in components
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  return (
    <SupplierContext.Provider
      value={{
        requests,
        getRequests,
        categories,
        setCategories,
        activePageTab,
        setActivePageTab,
        date,
        getMyOffers,
        myNegotiations,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplierContext = () => useContext(SupplierContext);
