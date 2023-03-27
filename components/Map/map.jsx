// import { useEffect, useRef, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine';

// export function Map({ deliveries }) {
//   const mapDivRef = useRef(null);
//   const [mapInstance, setMapInstance] = useState(null);

//   useEffect(() => {
//     if (!window.L) {
//       return;
//     }

//     const map = window.L.map(mapDivRef.current);
//     setMapInstance(map);

//     map.setView([51.505, -0.09], 13);

//     window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution:
//         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(map);

//     window.L.Routing.control({
//       waypoints: [
//         window.L.latLng(57.74, 11.94),
//         window.L.latLng(57.6792, 11.949),
//       ],
//       routeWhileDragging: true,
//     }).addTo(map);

       
// }
// }

