import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import { findCenter } from './countCenter';
import Pin from '../pin/Pin';

function Map({ items }) {
  const center = findCenter(
    items.map((item) => {
      return {
        lat: item.latitude,
        lng: item.longitude,
      };
    })
  );
  return (
    <MapContainer
      center={
        items.length > 0
          ? center
          : [52.4797, -1.90269]
      }
      zoom={7}
      scrollWheelZoom={true}
      className='map'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {items.map((item) => {
        return (
          <Pin
            key={item.id}
            item={item}
          />
        );
      })}
    </MapContainer>
  );
}

export default Map;
