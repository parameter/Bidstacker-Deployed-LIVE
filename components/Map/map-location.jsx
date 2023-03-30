'use client';


import { useEffect, useRef, useState } from 'react';
// import DeliveryInfo from './selected-delivery-info';
import { useRouter } from 'next/router';
import SelectedDeliveryInfo from './selected-delivery-info';
import Link from 'next/link';
import { AddressAutofill } from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
 import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

function MapComponent({ deliveries, params }) {
 const mapDivRef = useRef(null);
 const [scriptIsLoaded, setScriptIsLoaded] = useState(false);
 const [mapInstance, setMapInstance] = useState(null);
 const [currentPosition, setCurrentPosition] = useState(null);
 const [distances, setDistances] = useState([]);
 const deliveryMarkers = useRef([]);
 const [selectedMarker, setSelectedMarker] = useState(null);
 const [selectedDelivery, setSelectedDelivery] = useState(null);
 const [routingControl, setRoutingControl] = useState(null);
 const [destination, setDestination] = useState(null);
 const [map, setMap] = useState(null)
 const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
 const [firstInfo, setFirstInfo] = useState(false);

 useEffect(() => {
  if (selectedMarker && currentPosition) {
    const newDistances = [...distances];
    deliveryMarkers.current.forEach(({ marker }, index) => {
      const latLng = marker.getLngLat();
      if (latLng) {
        const distance = turf.distance(
          [currentPosition.lng, currentPosition.lat],
          [latLng.lng, latLng.lat],
          { units: 'meters' }
        );
        newDistances[index] = distance;
      }
    });
    setDistances(newDistances);
  }
}, [selectedMarker, currentPosition]);

useEffect(() => {
  const mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  document.body.appendChild(mapContainer);

  const script = document.createElement('script');
  script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js';
  script.onload = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFlbGlhIiwiYSI6ImNsZnRucWkwcjAybjYzaWxkY200cmxoOHIifQ.LLPBjbqiG5B7gk8S1bEQjw';
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});
  };
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(mapContainer);
    document.body.removeChild(script);
  };
}, []);


function successLocation(position) {
console.log("Hejfrån successLocation", position)
const coordinates = ([position.coords.longitude, position.coords.latitude]);
setUpMap(coordinates);
console.log("coordinates",coordinates);
  const marker = new mapboxgl.Marker({ color: "blue" })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML("<h3>You are here</h3>")
    );
  if (mapInstance) {
    marker.addTo(mapInstance);
  }
}

function errorLocation(err){
       if (err.code === 1) {
         alert('Please allow geolocation access');
       } else {
         alert('Cannot get current location');
       }
     }

function setUpMap(center) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: center,
    zoom: 14,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav)

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });
  map.addControl(directions, "bottom-left")

  if (mapInstance) {
     addDeliveryMarkers(mapInstance, deliveries);
    return;
  }

  setShowDeliveryInfo(false);
   addDeliveryMarkers(map, deliveries);
   setMapInstance(map);

}

 async function addDeliveryMarkers(map, deliveries) {
  if (!deliveries || deliveries.length === 0) {
    return;
  }
  deliveryMarkers.current.forEach(({ marker }) => {
    marker.remove();
  });
  deliveryMarkers.current = [];

  for (const delivery of deliveries) {
    const address = `${delivery.street}, ${delivery.postalCode} ${delivery.city}`;
    const coordinates = await geocodeAddress(address);

    if (coordinates) {
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

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

      const marker = new mapboxgl.Marker()
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .setPopup(popup)
        .addTo(map);

      marker.on('click', () => {
        // Get the coordinates of the selected delivery marker
        const coordinates = {
          latitude: marker.getLngLat().lat,
          longitude: marker.getLngLat().lng,
        };

        setDestination(coordinates);
        setSelectedMarker(coordinates);

        setSelectedDelivery(delivery);
        console.log("selectedDelivery")
        router.push({
          pathname: `/management/delivery/map/DeliveryMap/${delivery._id}`,
        }, undefined, { shallow: true });
      });

      deliveryMarkers.current.push({
        marker,
        coordinates: [coordinates.longitude, coordinates.latitude],
      });
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

 const router = useRouter();

 const handleInfo = (delivery) => {
  console.log("handleInfo", handleInfo)
  setSelectedDelivery(delivery);
  setShowDeliveryInfo(true);
  router.push({
    pathname: '/management/delivery/map/DeliveryMap/',
  }, undefined, { shallow: true });


 };

 const acceptDelivery = (delivery) => {
   setSelectedDelivery(null);
   console.log("clicked on acceptDelivery")

 };

 const handleInfoClose = (delivery) => {
  setShowDeliveryInfo(false);
    setSelectedDelivery(null);
    setFirstInfo(false); 
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
            
            <div className="bg-white rounded-lg shadow w-full max-w-xl overflow-hidden mb-auto">
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
            <Link
                href={{
                  pathname: '/management/delivery/map/DeliveryMap',
                  query: { info: 'delivery', params: router.query.params },
                }}
                shallow
              >
                <button
                  className="info-button px-12 border-2 rounded-full border-black mb-4"
                  onClick={() => handleInfo(selectedDelivery)}
                >
                  Övrig info
                </button>
                </Link>
                {showDeliveryInfo && (

                <SelectedDeliveryInfo
                  deliveryItem={selectedDelivery}
                  onClose={handleInfoClose} 
                  info={router.query.info}
                  selectedDelivery={selectedDelivery} 
                  params={router.query.params}
                  id={router.query.params[1]}
                />

                )}

            <p className="text-sm border-t border-b pt-2 pb-2 mb-4">
              {deliveryItem._id}
            </p>
            <div className="flex items-center justify-center">
            <button
              className="bg-green text-white py-1 px-6 rounded-full mb-4"
              onClick={() => acceptDelivery(selectedDelivery)}
              aria-label="Accept delivery"
            >
              Accept
            </button>
              <br/>
            <button
                  className="bg-gray-400 text-white py-1 px-6 rounded-full mb-8 ml-4"
                  onClick={() => handleInfoClose()}
                >
                  Stäng  info
                </button>
            </div>
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




