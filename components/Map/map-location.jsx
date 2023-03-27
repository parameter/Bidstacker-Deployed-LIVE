import { useEffect, useRef, useState, useCallback } from 'react'; 
import DeliveryModal from './deliveryModal';
import L from 'leaflet';
import 'leaflet-routing-machine';
// import Leaflet from 'leaflet';

function MapDeliveryLocation({ deliveries }) {
  const mapDivRef = useRef(null);
  const [scriptIsLoaded, setScriptIsLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null); 
  const [currentPosition, setCurrentPosition] = useState(null);
  const [distances, setDistances] = useState([]);
  const deliveryMarkers = useRef([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [lines, setLines] = useState([]);
  const line = useRef(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  console.log('MapDeliveryLocation HEj');

  useEffect(() => {
    if (currentPosition) {
      const newDistances = deliveryMarkers.current.map(({ coordinates }) => {
        const distance = mapInstance.distance(
          [currentPosition?.lat, currentPosition?.lng],
          coordinates
        );
        return distance;
      });
  
      setDistances(newDistances);
  
      lines.forEach(line => {
        mapInstance.removeLayer(line);
      });
    }
    console.log('currentPosition',currentPosition);
  }, [currentPosition, mapInstance, lines]);
  

  useEffect(() => {
    const script = document.createElement('script');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      
    script.async = true;
  
    document.head.appendChild(link);
    document.head.appendChild(script);
  
    script.onload = () => {
      setScriptIsLoaded(true);
    };
  
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    initiateMap();
  }, [scriptIsLoaded, deliveries, initiateMap]);

  
  const initiateMap = useCallback(async () => {

    if (typeof L !== 'undefined') {
      if(mapInstance){
        await addDeliveryMarkers(mapInstance, deliveries);
        return;
      }
      const map = L.map(mapDivRef.current);
      setMapInstance(map);

      map.setView([51.505, -0.09], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      navigator.geolocation.watchPosition(success, error);
      let marker, circle, zoomed;

      await addDeliveryMarkers(map, deliveries);
    
      function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;
        const newPos = {lat,lng}
        setCurrentPosition(newPos)
        console.log("currentPosition", newPos)
  

        if (marker) {
          map.removeLayer(marker);
          map.removeLayer(circle);
        }
        marker = L.marker([lat, lng]).addTo(map);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
        if (!zoomed) {
          zoomed = map.fitBounds(circle.getBounds());
        }
        map.setView([lat, lng]);
      }

      function error(err) {
        if (err.code === 1) {
          alert('Please allow geolocation access');
        } else {
          alert('Cannot get current location');
        }
      }
    }
  },[addDeliveryMarkers, mapInstance, deliveries]);

  async function addDeliveryMarkers(map, deliveries) {
    if (!deliveries || deliveries.length === 0) {

      return;
    }

    deliveryMarkers.current.forEach((marker) => {
      map.removeLayer(marker);
    });
    
    deliveryMarkers.current = [];
    
    for (const [deliveryIndex, delivery] of deliveries.entries()) {
      const address = `${delivery.street}, ${delivery.postalCode} ${delivery.city}`;
      const coordinates = await geocodeAddress(address);

      if (coordinates) {
        const marker = L.marker([
          coordinates.latitude,
          coordinates.longitude,
        ]);

        marker.on('click', () => {
          setSelectedMarker(coordinates);
          //  drawLine(coordinates);

        });
        
        deliveryMarkers.current.push({
          marker,
          coordinates: [coordinates.latitude, coordinates.longitude],
        });

        const popupContent = `
        <div>
          <h4>Delivery Information</h4>
          <p>Street: ${delivery.street}</p>
          <p>Postal Code: ${delivery.postalCode}</p>
          <p>City: ${delivery.city}</p>
          <!-- Add any other information you want to display here -->
        </div>
      `;

      // Bind the popup content to the marker
       marker.bindPopup(popupContent);
        marker.addTo(map);
      }
      
    }
  }

  
  async function geocodeAddress(address) {
    const query = encodeURIComponent(address);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
    );

    const data = await response.json();

    if (data.length === 0) {
      console.warn(`No coordinates found for address: ${address}`);
      return null;
    }

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  }

  function acceptDelivery(delivery){
    console.log()
  }

  return (
    <>
      <div
        id="map"
        style={{
          height: '500px',
          width: '100%',
          margin: '0 auto 20px',
        }}
        ref={mapDivRef}
      ></div>
             <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
          <script src="leaflet-routing-machine.js"></script>
<div className="bg-white rounded-lg shadow overflow-hidden">
  <div className="p-4">
    <div className="relative">
      <input type="text" className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" 
      placeholder="Sök uppdrag..."/>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 mr-2" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="10" cy="10" r="7" />
  <line x1="21" y1="21" x2="15" y2="15" />
</svg>

      </div>
    </div>
  </div>
  <ul className="divide-y divide-gray-200">      
  {deliveries && deliveries.map((deliveryItem, deliveryIndex) => {
  return (
    <li key={deliveryIndex} 
    className="px-4 py-3" 
    onClick={() => setSelectedDelivery(deliveryItem)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-bold">{deliveryItem.street}</h4>
          <p className="text-gray-600">{deliveryItem.postalCode} {deliveryItem.city}</p>
        </div>
        <div className="flex items-center ml-4">
          {distances[deliveryIndex] !== undefined && (
            <p className="text-gray-600">
              {(distances[deliveryIndex] / 1000).toFixed(2)} km
            </p>
          )}
          <button onClick={() => setSelectedDelivery(deliveryItem)}>POP UP OPEN</button>
        </div>
      </div>
      {selectedDelivery && selectedDelivery.id === deliveryItem.id && (
        <DeliveryModal
          delivery={selectedDelivery}
          onAccept={() => acceptDelivery(selectedDelivery)}
        />
      )}
    </li>
  );
})}

    </ul>

</div>
    </>
  );
}

export default MapDeliveryLocation;
