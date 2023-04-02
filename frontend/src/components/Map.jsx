import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import '../public/css/Map.css';

mapboxgl.accessToken = '<Mapboxgl accessToken here>';

// Map
const Map = () => {
  // Initialize
  const { plan } = useSelector((state) => state.plan);
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(100.5018);
  const [lat, setLat] = useState(13.7563);
  const [zoom, setZoom] = useState(4);

  const tours = useSelector((state) => state.tours.tours);

  useEffect(() => {
    // Mabbox config
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker
    // Marker from database
    if (plan === null || plan === undefined) {
      map.on('load', () => {
        tours.data.data.forEach((el) => {
          new mapboxgl.Marker()
            .setLngLat(el.startLocation.coordinates)
            .addTo(map);
        });
      });

      // Fit map to the boundary of the plan
      const coordinates = tours.data.data.map(
        (el) => el.startLocation.coordinates
      );
      const bounds = coordinates.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds()
      );
      map.fitBounds(bounds, { padding: 50 });

      // Marker depend on user tour plan
    } else {
      const markers = document.getElementsByClassName('mapboxgl-marker');
      while (markers.length > 0) {
        markers[0].parentNode.removeChild(markers[0]);
      }

      plan.data.location.forEach((el) => {
        new mapboxgl.Marker().setLngLat(el.coordinates).addTo(map);
      });

      // Fit map to the boundary of the plan
      const coordinates = plan.data.location.map((el) => el.coordinates);
      const bounds = coordinates.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds()
      );
      map.fitBounds(bounds, { padding: 50 });
    }

    // Move handlers
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, [plan, tours]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="flex justify-center px-4">
        <div className="map">
          <div id="map-1" className="map-container" ref={mapContainerRef} />
          {}
        </div>
      </div>
    </>
  );
};

export default Map;
