import React from 'react';
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import './Map.css';

// kboul help me to write ChangeMapView function
// https://stackoverflow.com/users/4929531/kboul

function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.setView([coords.lat, coords.lng], zoom);

  return null;
}

function Map({ center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeMapView coords={center} zoom={zoom} />
      </LeafletMap>
    </div>
  );
}

export default Map;
