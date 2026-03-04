import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DayMapProps {
  coordinates?: string; // "lat,lon" format
  location?: string;
  dayNumber: number;
  onCoordinatesChange?: (coordinates: string) => void;
  onLocationChange?: (location: string) => void;
}

export const DayMap = ({
  coordinates,
  location,
  dayNumber,
  onCoordinatesChange,
  onLocationChange,
}: DayMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const [inputLocation, setInputLocation] = useState(location || "");

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([40, 0], 3);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map.current);

      // Click to add marker
      map.current.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const coords = `${lat.toFixed(6)},${lng.toFixed(6)}`;

        if (marker.current) {
          marker.current.setLatLng(e.latlng);
        } else {
          marker.current = L.marker(e.latlng).addTo(map.current!);
        }

        marker.current.bindPopup(`Day ${dayNumber}: ${coords}`).openPopup();
        onCoordinatesChange?.(coords);
      });
    }

    // Set marker if coordinates are provided
    if (coordinates) {
      const [lat, lng] = coordinates.split(",").map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        map.current.setView([lat, lng], 10);

        if (marker.current) {
          marker.current.setLatLng([lat, lng]);
        } else {
          marker.current = L.marker([lat, lng]).addTo(map.current);
        }
        marker.current.bindPopup(`Day ${dayNumber}: ${coordinates}`);
      }
    }

    // Cleanup on unmount
    return () => {
      // Don't destroy map on unmount as it might be reused
    };
  }, [coordinates, dayNumber, onCoordinatesChange]);

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={`Location for Day ${dayNumber}`}
          value={inputLocation}
          onChange={(e) => {
            setInputLocation(e.target.value);
            onLocationChange?.(e.target.value);
          }}
          className="flex-1 bg-[#FAFAFE] border border-[#EFEFEF] focus:border-[#0DAC87] h-10 rounded-md px-4 text-sm"
        />
      </div>
      <div
        ref={mapContainer}
        className="rounded-md border border-[#EFEFEF] overflow-hidden"
        style={{ height: "300px", width: "100%" }}
      />
      {coordinates && (
        <div className="bg-[#F5FFF5] border border-[#0DAC87] rounded-md px-3 py-2 text-sm text-[#0DAC87]">
          Coordinates saved: {coordinates}
        </div>
      )}
    </div>
  );
};
