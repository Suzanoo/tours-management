import { useRef, useState, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import '../public/css/Map.css';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic3V6YW5vbyIsImEiOiJjbGVmc2t4eTYwMDBtNDZxbDkyNmlqdDhkIn0.T78HnlAr5OHoHOh1-JN99g';

// Fetch locations from MongoDB and parse as markers of map
const loadMarker = async (map, tours) => {
  await tours.data.data.forEach((el) => {
    new mapboxgl.Marker().setLngLat(el.startLocation.coordinates).addTo(map);
  });
};

// Map
const Map = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(100.5018);
  const [lat, setLat] = useState(13.7563);
  const [zoom, setZoom] = useState(4);

  const tours = JSON.parse(localStorage.getItem('tours'));

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', async () => {
      await loadMarker(map, tours);
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="map">
        {/* <div className="sidebarStyle">
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div> */}
        <div className="map-container" ref={mapContainerRef} />
        {}
      </div>
    </>
  );
};

export default Map;
