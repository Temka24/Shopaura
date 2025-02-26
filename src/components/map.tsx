"use client"
import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
    iconUrl: "/free_vector.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const Map: React.FC = () => {

    return (
        <>
            <MapContainer center={[47.93567344951824, 106.91951195593678]} zoom={16} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[47.93567344951824, 106.91951195593678]} icon={customIcon}>
                    <Popup>This is my position</Popup>
                </Marker>
            </MapContainer>
        </>
    )
}

export default Map;