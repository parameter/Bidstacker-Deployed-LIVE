import { useState } from 'react';
import axios from 'axios';
import _ from 'underscore';

const useGetRequests = (url) => {
  const [requests, setRequests] = useState({});
  const [categories, setCategories] = useState([]);
  const formData = {
    // _csrf: await NextAuth.csrfToken(),
    categories: categories,
  };

  const getRequests = async () => {
    // Fetch all requests
    const res = await axios.get(url, { params: formData });
    // Group all requests by groupId and save them in a variable
    const groupedRequests = _.groupBy(res.data.request_items, 'groupId');

    Object.keys(groupedRequests).forEach((groupId) => {
      const deliveries = res.data.deliveries.filter(
        (item) => item.groupId === groupId
      );
      const request_metadata = res.data.request_metadata.filter(
        (item) => item.groupId === groupId
      );
      const negotiations = res.data.negotiations.filter(
        (item) => item.groupId === groupId
      );

      groupedRequests[groupId] = {
        request_metadata: request_metadata[0],
        request_items: groupedRequests[groupId],
        delivery: deliveries,
        negotiations: negotiations,
      };
    });

    // console.log(groupedRequests);
    setRequests(groupedRequests);
  };

  return { requests, getRequests, categories, setCategories };
};

export default useGetRequests;
