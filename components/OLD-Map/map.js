import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import '/node_modules/leaflet/dist/leaflet.css';
import { MapPinIcon } from '@heroicons/react/24/outline';
// import Leaflet from 'leaflet';

const MapComponent = ({
  activeDeliveryOperators,
  currentNegotiations,
  initialCoords,
  picker,
  style,
}) => {
  const mapRef = useRef(null);
  const [Leaflet, setLeaflet] = useState(null);
  const [map, setMap] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const adress = useRef(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (Leaflet === null) {
      return;
    }
    setupMap();
  }, [setupMap, Leaflet]);

  useEffect(() => {
    if (!activeDeliveryOperators) {
      return;
    }
    addOperatorMarkers();
  }, [addOperatorMarkers, activeDeliveryOperators, Leaflet, mapReady]);

  useEffect(() => {
    if (!currentNegotiations) {
      return;
    }
    addSupplierMarkers();
  }, [currentNegotiations, Leaflet, mapReady, addSupplierMarkers]);

  const addSupplierMarkers = useCallback(() => {
    if (
      currentNegotiations.length === 0 ||
      Leaflet === null ||
      mapReady === false
    ) {
      return;
    }

    const greenIcon = Leaflet.icon({
      iconUrl: 'icons/shop.png',
      iconSize: [32, 32],
    });

    currentNegotiations.forEach((item) => {
      new Leaflet.Marker(
        [
          item.supplyLocation.coordinates[0],
          item.supplyLocation.coordinates[1],
        ],
        { icon: greenIcon }
      ).addTo(map);
    });
  }, [map, currentNegotiations, Leaflet, mapReady]);

  const addOperatorMarkers = useCallback(() => {
    if (
      activeDeliveryOperators.length === 0 ||
      Leaflet === null ||
      mapReady === false
    ) {
      return;
    }

    const greenIcon = Leaflet.icon({
      iconUrl: 'icons/cycle.png',
      iconSize: [32, 32],
    });

    activeDeliveryOperators.forEach((item) => {
      new Leaflet.Marker(
        [item.location.coordinates[0], item.location.coordinates[1]],
        { icon: greenIcon }
      ).addTo(map);
    });
  }, [map, activeDeliveryOperators, mapReady, Leaflet]);

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
      iconUrl: 'icons/packet.png',
      iconSize: [32, 32],
    });
    // const packetIcon = Leaflet.icon({
    //   iconUrl: 'icons/packet.png',
    //   iconSize: [32, 32],
    // });
    new Leaflet.Marker(initialCoords, { icon: packetIcon }).addTo(_map);

    _map.setView(initialCoords, 14);

    setMap(_map);
    setMapReady(true);
  }, [Leaflet, mapRef, initialCoords, setMap, setMapReady]);

  const setAdressCoordinates = useCallback((coords) => {
    setAdressCoordinates(coords);
  }, []);

  useEffect(() => {
    if (coordinates === null) {
      return;
    }
    setAdressCoordinates(coordinates);
    // setAdressCoordinates({
    //   lat: 60.394436265541124,
    //   lon: 16.498714249724493,
    // });
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
  }, [map, coordinates]);

  /*   if (!process.browser) {
    return;
  }
 */
  return (
    <>
      {picker && (
        <form
          className="map__address-search"
          onSubmit={(event) => {
            event.preventDefault();
            searchAdress();
          }}
        >
          {/* <input className="map__address-search-input" ref={adress} type="text" name="adress" /> */}
          <button
            className="map__address-search-button"
            onClick={() => searchAdress()}
            type="button"
          >
            Sök address
          </button>
        </form>
      )}

      {/* Map containern nedan - När man infogar componenten så skicka 
      med styling i en prop, ex. "style={'h-40 tablet:h-60 w-full rounded-xl'}" */}

      <div className={style} ref={mapRef}></div>
    </>
  );
};
export default MapComponent;
