import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    height?: string | number;
    onLocationFound?: (lat: number, lng: number) => void;
}

const LocationMarker: React.FC<{ onLocationFound?: (lat: number, lng: number) => void }> = ({ onLocationFound }) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const map = useMap();

    useEffect(() => {
        const handleLocationFound = (e: L.LocationEvent) => {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 13);
            if (onLocationFound) {
                onLocationFound(e.latlng.lat, e.latlng.lng);
            }
        };

        const handleLocationError = (e: L.ErrorEvent) => {
            console.error("Location access denied or error:", e.message);
            // Optional: Show a user-friendly message or toast
        };

        map.on("locationfound", handleLocationFound);
        map.on("locationerror", handleLocationError);

        // Request high accuracy for better results
        map.locate({ setView: false, enableHighAccuracy: true });

        return () => {
            map.off("locationfound", handleLocationFound);
            map.off("locationerror", handleLocationError);
        };
    }, [map, onLocationFound]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}

const Map: React.FC<MapProps> = ({ height = '100%', onLocationFound }) => {
    // Default position (New Delhi for context, or generic)
    const defaultPosition: [number, number] = [28.6139, 77.2090];

    return (
        <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={true} style={{ height: height, width: '100%', minHeight: '300px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onLocationFound={onLocationFound} />
        </MapContainer>
    );
};

export default Map;
