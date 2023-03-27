'use client';

import {
  useEffect,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';
import _ from 'underscore';
import axios from 'axios';
import { filterRequests } from '@/lib/filter-requests';
import { useAppContext } from 'context/app-context';
import { useCurrentUser } from '@/lib/user';

import socketio from 'socket.io-client';

export const RequestContext = createContext({});

export const RequestProvider = ({ children }) => {
  const { data: { user } = {} } = useCurrentUser();
  const [myRequests, setMyRequests] = useState({});
  const [myProjects, setMyProjects] = useState({});
  const [isPrelAdmin, setIsPrelAdmin] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState([]);
  const [socket, setSocket] = useState(false);
  const { newNotice } = useAppContext();

  useEffect(() => {
    // console.log(user);
    if (user && socket) {
      // console.log('trying to send', user._id);
      // socket.send(JSON.stringify(user._id));
    }
  }, [user, socket]);

  const setupSocket = () => {
    /*     localStorage.debug = '*';

    // const socket = socketio.connect(
    //   'https://whale-app-a6c8t.ondigitalocean.app',
    //   {
    //     autoConnect: true,
    //     withCredentials: false,
    //     allowedHeaders: ['Access-Control-Allow-Origin'],
    //     transports: ['websocket'],
    //     rejectUnauthorized: false,
    //   }
    // );

    // socket.on('connect', () => {
    //   console.log('Successfully connected!');
    // });
    socket.on('connect', () => {
      // console.log('Successfully connected!');
    }); */

    return;
    const protocol = window.location.protocol.includes('https') ? 'wss' : 'ws';
    const _socket = new WebSocket(
      `${protocol}://whale-app-a6c8t.ondigitalocean.app/socket`
    );

    _socket.onopen = (event) => {
      setSocket(_socket);
    };

    _socket.onmessage = function (event) {
      console.log('A Message for you sers and sirs', event.data);
    };

    _socket.addEventListener('error', (event) => {
      console.log('WebSocket error: ', event);
    });

    /*  const ws = new WebSocket(`ws://localhost:8080`); */

    /*  ws.onmessage = function (event) {
      console.log('HALLY', event);
    };

    return; */

    // rejectUnauthorized: false

    /* const _socket = io('wss://whale-app-a6c8t.ondigitalocean.app:1337', {
      transports: ['websocket'],
      upgrade: false,
      /* rejectUnauthorized: false,
      withCredentials: false 
    }) */

    /*  const _socket = io('wss://whale-app-a6c8t.ondigitalocean.app:443', {
      transports: ['websocket'],
      upgrade: false,
      rejectUnauthorized: false,
      withCredentials: false 
    });  */

    /* const _socket = io('http://localhost:4000', {
      transports: ['websocket'],
      upgrade: false,
    }); */

    /* _socket.on('connect', function () {
      console.log('Connected');
    });

    _socket.on('connect_error', (err) => {
      console.log('err',err)
    }); */

    // Global events are bound against socket

    // setSocket(_socket);
  };

  useEffect(() => {
    setupSocket();
    if (!socket) {
      return;
    }
    // listen for 'new-offer' event from server
    socket.on('new-offer', (data) => {
      newNotice('Du har en ny offert');
      getMyRequests();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getMyRequests = useCallback(async () => {
    const res = await axios.get('/api/requestor/myRequests');
    const requests = filterRequests(res.data);
    setMyRequests(requests);
  }, []);

  const getMyProjects = useCallback(async () => {
    const res = await fetch('/api/projects/get-all-projects');
    const data = await res.json();
    setMyProjects(data.result);
  }, []);

  const addRequestToProjectByGroupId = useCallback(
    async (projectId, groupId) => {
      const res = await axios.put('/api/projects/update-project-requests', {
        projectId: projectId,
        groupId: groupId,
      });
      const data = res.data;

      if (data.result) {
        console.log('HEJHOPP!!!!', data.result);
        setLoadingStatus(groupId, false);
      }
    },
    []
  );

  const deleteRequestFromProject = async (projectId, groupId) => {
    console.log('deleteRequestFromProject', projectId, groupId);
    const res = await axios.post('/api/projects/delete-project-request', {
      projectId: projectId,
      groupId: groupId,
    });
    const data = res.data;
    if (data.result) {
      console.log('HEJHOPP!!!!', data.result);
      setLoadingStatus(groupId, false);
    }
  };

  const testingAdmin = () => {
    setIsPrelAdmin(!isPrelAdmin);
    /*     if (user && user.role === 'admin') {
      return true;
    }
    return false; */
  };

  const setLoadingStatus = useCallback((groupId, loading) => {
    setLoadingIndex((prevLoadingIndex) => ({
      ...prevLoadingIndex,
      [groupId]: loading,
    }));
  }, []);

  return (
    <RequestContext.Provider
      value={{
        myRequests,
        getMyRequests,
        myProjects,
        getMyProjects,
        setMyProjects,
        addRequestToProjectByGroupId,
        deleteRequestFromProject,
        isPrelAdmin,
        testingAdmin,
        loadingIndex,
        setLoadingIndex,
        setLoadingStatus,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => useContext(RequestContext);
