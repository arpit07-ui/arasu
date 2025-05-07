// src/components/admin/MapManager.tsx
import React, { useState } from "react";

const MapManager: React.FC = () => {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [locations, setLocations] = useState<{ lat: string; lng: string }[]>([]);

  const handleAddLocation = () => {
    if (coordinates.lat && coordinates.lng) {
      setLocations([...locations, coordinates]);
      setCoordinates({ lat: "", lng: "" });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Project Location</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Latitude"
          value={coordinates.lat}
          onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={coordinates.lng}
          onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleAddLocation}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add
        </button>
      </div>

      <div className="grid gap-6">
        {locations.map((loc, index) => (
          <div key={index} className="border rounded shadow">
            <iframe
              width="100%"
              height="300"
              loading="lazy"
              src={`https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=15&output=embed`}
              className="w-full"
              allowFullScreen
            ></iframe>
            <div className="p-2 bg-gray-100 text-sm text-gray-700">
              Coordinates: {loc.lat}, {loc.lng}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapManager;
