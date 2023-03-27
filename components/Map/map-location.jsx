'use client';


import { useCallback, useEffect, useRef, useState } from 'react';
import DeliveryModal from './deliveryModal';
import Leaflet from 'leaflet';
import 'leaflet-routing-machine';


function MapComponent({ deliveries, singleRequest }) {
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
 const [routingControl, setRoutingControl] = useState(null);
 const [destination, setDestination] = useState(null);
const [map, setMap] = useState(null)

 useEffect(() => {
   if (currentPosition && destination) {
     // setWaypoints([
     //   Leaflet.latLng(currentPosition?.lat, currentPosition?.lng),
     //   Leaflet.latLng(destination?.latitude, destination?.longitude),
     // ]);
   }
   if (mapInstance && currentPosition && selectedMarker) {
     lines.forEach((line) => {
       mapInstance.removeLayer(line);
     });
     // drawLine(routingControl, selectedMarker, mapInstance);
   }
 }, [currentPosition, destination, selectedMarker]);


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
 }, [scriptIsLoaded, deliveries]);


 // const [waypoints, setWaypoints] = useState([
 //   Leaflet.latLng(currentPosition?.lat, currentPosition?.lng),
 //   Leaflet.latLng(destination?.latitude, destination?.longitude),
 // ]);


 const initiateMap = async () => {
   if (typeof L !== 'undefined') {
     if (mapInstance) {
       await addDeliveryMarkers(mapInstance, deliveries);
       return;
     }
     const _map = Leaflet.map(mapDivRef.current, {
       center: [51.505, -0.09],
       zoom: 14,
     });
     setMapInstance(_map);
 
     // Call getCurrentPosition() to get the current user's location
     navigator.geolocation.getCurrentPosition(success, error);
      let marker, circle, zoomed;
     Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
       attribution:
         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
     }).addTo(_map);
      const routing = Leaflet.Routing.control({
       lineOptions: {
         style: [{ color: '#00BFFF', weight: 6 }],
       },
       showAlternatives: false,
       routeWhileDragging: true,
     }).addTo(_map);
      setRoutingControl(routing);
      await addDeliveryMarkers(_map, deliveries);
      function success(pos) {
       const lat = pos.coords.latitude;
       const lng = pos.coords.longitude;
       const accuracy = pos.coords.accuracy;
       const newPos = { lat, lng };
       setCurrentPosition(newPos);
       if (marker) {
         _map.removeLayer(marker);
         _map.removeLayer(circle);
       }
       marker = Leaflet.marker([lat, lng]).addTo(_map);
       circle = Leaflet.circle([lat, lng], { radius: accuracy }).addTo(_map);
       if (!zoomed) {
         zoomed = _map.setView([lat, lng], 13);
       }
     }
      function error(err) {
       if (err.code === 1) {
         alert('Please allow geolocation access');
       } else {
         alert('Cannot get current location');
       }
     }
   
    setMap(_map)
    console.log("MAP", _map)
   }
 };

 async function addDeliveryMarkers(map, deliveries) {
   if (!deliveries || deliveries.length === 0) {
     return;
   }
   deliveryMarkers.current.forEach(({ marker }) => {
     map.removeLayer(marker);
   });
   deliveryMarkers.current = [];
   for (const delivery of deliveries) {
     const address = `${delivery.street}, ${delivery.postalCode} ${delivery.city}`;
     const coordinates = await geocodeAddress(address);
     if (coordinates) {
       const marker = Leaflet.marker([
         coordinates.latitude,
         coordinates.longitude,
       ]);


       marker.on('click', () => {
        Leaflet.Routing.control({
          waypoints: [
            Leaflet.latLng(currentPosition?.lat, currentPosition?.lng),
            Leaflet.latLng(destination?.lat, destination?.lng)
          ]
        }).addTo(map);
         // Get the coordinates of the selected delivery marker
         const coordinates = {
           latitude: marker.getLatLng().lat,
           longitude: marker.getLatLng().lng,
         };

         setDestination(coordinates);
         setSelectedMarker(coordinates);
         setSelectedDelivery(delivery);

       });
       deliveryMarkers.current.push({
         marker,
         coordinates: [coordinates.latitude, coordinates.longitude],
       });

       
         const popupContent = `
          <div>
            <h4>Delivery Information</h4>
            <p>Id: ${delivery._id}</p>
             <p>Street: ${delivery.street}</p>
            <p>Postal Code: ${delivery.postalCode}</p>
            <p>City: ${delivery.city}</p>
            <!-- Add any other information you want to display here -->
          </div>
        `;
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
 const handleInfo = (delivery) => {

  console.log("clicked on handleInfo")
  };

 const acceptDelivery = (delivery) => {
   setSelectedDelivery(null);
   console.log("clicked on acceptDelivery")

 };

 const handleClose = (delivery) => {

console.log("clicked on handleClose")
};

 return (
   <>
<div className="map-container h-screen flex flex-col justify-center items-center">
  <div
    id="map"
    className="w-full"
    style={{ height: 'calc(100% - 20rem)' }}
    ref={mapDivRef}
  ></div>
  <div className="bg-white rounded-lg shadow w-full max-w-xl overflow-hidden">
    <div className="p-3">
      <div className="relative">
        <input
          type="text"
          className="w-full px-2 py-1 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          placeholder="Sök uppdrag..."
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400 mr-2"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </div>
      </div>
    </div>
         <ul className="divide-y divide-gray-200">
           {deliveries &&
             deliveries.map((deliveryItem, deliveryIndex) => {
               return (
                 <li
                   key={deliveryIndex}
                   className="px-4 py-3"
                   onClick={() => setSelectedDelivery(deliveryItem)}
                 >
                    {/* <div className="flex items-start justify-between">
                     <div className="flex-1">
                       <h4 className="font-bold">{deliveryItem.street}</h4>
                       <p className="text-gray-600">
                         {deliveryItem.postalCode} {deliveryItem.city}
                       </p>
                     </div>
                     <div className="flex items-center ml-4">
                       {distances[deliveryIndex] !== undefined && (
                         <p className="text-gray-600">
                           {(distances[deliveryIndex] / 1000).toFixed(2)} km
                         </p>
                       )}
                       <button
                         onClick={() => setSelectedDelivery(deliveryItem)}
                       ></button>
                     </div>
                   </div>  */}
{selectedDelivery && (
  <div className="delivery-info md:hidden h-3/4 flex flex-col justify-center items-center">
  <p>{selectedDelivery.street}</p>
  <p>
    {selectedDelivery.city}, {selectedDelivery.postalCode}
  </p>
  <p className="text-sm border-t border-b py-1">
    <span className="text-xs text-gray-500">
      Distance: {(distances[deliveryIndex] / 1000).toFixed(2)} km
    </span>
    <br />
  </p>
  <div className="flex items-center justify-center mt-2">
    <button
      className="info-button px-12 border-2  rounded-full border-black mb-4"
      onClick={() => handleInfo()}
    >
      Övrig info
    </button>
  </div>
  <p className="text-sm border-t border-b pt-2 pb-2 mb-4">
    {deliveryItem._id}
  </p>
  <div className="flex items-center justify-center">
    <button
      className="bg-gray-800 text-white py-1 px-6 rounded-full mb-4"
      onClick={() => acceptDelivery(selectedDelivery)}
      aria-label="Accept delivery"
    >
      Accept
    </button>
  </div>
  <button
    className="bg-gray-800 text-white py-1 px-6 rounded-full mb-8"
    onClick={() => handleClose()}
  >
    Stäng
  </button>
</div>
)}
                 </li>
               );
             })}
         </ul>
       </div>
     </div>
   </>
 );
}


export default MapComponent;





