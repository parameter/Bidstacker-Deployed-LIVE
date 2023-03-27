import { useState, useEffect, useRef, useCallback } from 'react';

import axios from 'axios';
import Leaflet from 'leaflet';

import '/node_modules/leaflet/dist/leaflet.css';

const MapComponent = ({
  nearbyRequests,
  singleRequest,
  initialCoords,
  picker,
}) => {
  const mapRef = useRef(null);
  // const [L, setL] = useState(null);
  const [map, setMap] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const adress = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [routingMachineLoaded, setRoutingMachineLoaded] = useState(false);

  const loadRoutingMachine = useCallback(() => {
    const script = document.createElement('script');
    script.src =
      'https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js';
    script.async = true;
    script.onload = () => setRoutingMachineLoaded(true);

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    setupMap();
    loadRoutingMachine();
  }, [setupMap, loadRoutingMachine]);

  useEffect(() => {
    if (
      !nearbyRequests ||
      mapReady === false ||
      routingMachineLoaded === false
    ) {
      return;
    }
    addNearbyRequests();
  }, [addNearbyRequests, nearbyRequests, mapReady, routingMachineLoaded]);

  useEffect(() => {
    if (
      !singleRequest ||
      mapReady === false ||
      routingMachineLoaded === false
    ) {
      return;
    }
    addSingleRequests();
  }, [addSingleRequests, singleRequest, mapReady, routingMachineLoaded]);

  const addSingleRequests = useCallback(() => {
    if (singleRequest.length === 0 || mapReady === false) {
      return;
    }

    const shopIcon = Leaflet.icon({
      iconUrl: 'icons/shop.png',
      iconSize: [32, 32],
    });

    const packetIcon = Leaflet.icon({
      iconUrl: 'icons/packet.png',
      iconSize: [32, 32],
    });

    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(
          singleRequest.requests[0].location.coordinates[0],
          singleRequest.requests[0].location.coordinates[1]
        ),
        Leaflet.latLng(
          singleRequest.location.coordinates[0],
          singleRequest.location.coordinates[1]
        ),
      ],
      createMarker: function (i, wp) {
        if (i === 0) {
          return Leaflet.marker([wp.latLng.lat, wp.latLng.lng], {
            icon: shopIcon,
          });
        } else {
          return Leaflet.marker([wp.latLng.lat, wp.latLng.lng], {
            icon: packetIcon,
          });
        }
      },
    }).addTo(map);
  }, [map, mapReady, singleRequest]);

  const addNearbyRequests = useCallback(() => {
    if (nearbyRequests.length === 0 || mapReady === false) {
      return;
    }

    Object.keys(nearbyRequests).map((key) => {
      Leaflet.Routing.control({
        waypoints: [
          Leaflet.latLng(
            nearbyRequests[key].requests[0].location.coordinates[0],
            nearbyRequests[key].requests[0].location.coordinates[1]
          ),
          Leaflet.latLng(
            nearbyRequests[key].location.coordinates[0],
            nearbyRequests[key].location.coordinates[1]
          ),
        ],
      }).addTo(map);
    });
  }, [map, mapReady, nearbyRequests]);

  const setupMap = useCallback(() => {
    var _map = Leaflet.map(mapRef.current, {
      center: initialCoords,
      zoom: 14,
    });

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(_map);

    // packet icon
    const packetIcon = Leaflet.icon({
      iconUrl: 'icons/cycle.png',
      iconSize: [32, 32],
    });
    new Leaflet.Marker(initialCoords, { icon: packetIcon }).addTo(_map);

    _map.setView(initialCoords, 14);

    setMap(_map);
    setMapReady(true);
  }, [mapRef, initialCoords]);

  const setAdressCoordinates = useCallback((coords) => {
    setAdressCoordinates(coords);
  }, []);

  useEffect(() => {
    if (coordinates === null) {
      return;
    }
    setAdressCoordinates(coordinates);
    centerMap();
  }, [centerMap, coordinates, setAdressCoordinates]);

  const searchAdress = async () => {
    var coordsResult = await axios.get(
      'https://nominatim.openstreetmap.org/search.php?q=' +
        encodeURIComponent(adress.current.value) +
        '+3&format=jsonv2'
    );
    if (coordsResult.data.length) {
      setCoordinates([
        parseFloat(coordsResult.data[0].lat),
        parseFloat(coordsResult.data[0].lon),
      ]);
    }
  };

  const centerMap = useCallback(() => {
    map.setView(coordinates, 14);
  }, [coordinates, map]);

  return (
    <>
      {picker && (
        <form>
          <input ref={adress} type="text" name="adress" />
          <button onClick={() => searchAdress()} type="button">
            Sök address
          </button>
        </form>
      )}
      <div className="map__wrapper" ref={mapRef}></div>
    </>
  );
};
export default MapComponent;
