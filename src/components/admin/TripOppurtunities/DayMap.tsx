import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin } from "lucide-react";

// Fix Leaflet default icon issue which causes icons not to show or be misplaced
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

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
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [inputLocation, setInputLocation] = useState(location || "");
  const [isSearching, setIsSearching] = useState(false);

  // Sync state if prop changes (e.g. during reordering)
  useEffect(() => {
    if (location !== undefined) {
      setInputLocation(location);
    }
  }, [location]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map if not already done
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainer.current).setView([40, 0], 3);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Fix for map not rendering correctly in dynamic layouts
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 200);

      // Click to add/move marker
      mapRef.current.on("click", async (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const coords = `${lat.toFixed(6)},${lng.toFixed(6)}`;

        updateMarker(lat, lng, coords);
        onCoordinatesChange?.(coords);

        // Reverse Geocoding: Get location name from coordinates
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          if (data && data.display_name) {
            // Usually the display_name is too long, so we take the first few parts
            const parts = data.display_name.split(",");
            const shortName = parts.slice(0, 3).join(",").trim();
            setInputLocation(shortName);
            onLocationChange?.(shortName);
          }
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
        }
      });
    }

    // Update marker when coordinates prop changes
    if (coordinates) {
      const parts = coordinates.split(",");
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        updateMarker(lat, lng, coordinates, false); // Don't recenter at high zoom if already set
      }
    } else if (markerRef.current) {
      // If coordinates cleared, remove marker
      markerRef.current.remove();
      markerRef.current = null;
    }

    // Helper to update marker
    function updateMarker(lat: number, lng: number, popupText: string, recenter = true) {
      if (!mapRef.current) return;

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      }

      const label = dayNumber === 0 ? "Trip Destination" : `Day ${dayNumber}`;
      markerRef.current.bindPopup(`${label}: ${popupText}`).openPopup();
      
      if (recenter) {
        mapRef.current.setView([lat, lng], 12);
      }
    }

    // Cleanup isn't strictly necessary for the mapRef as it's stored in a ref,
    // but the component might be unmounted/remounted.
    return () => {
      // In a real application with many maps, we'd destroy the map instance here
      // but Leaflet maps often don't like being destroyed then remounted in the same DOM element.
    };
  }, [coordinates, dayNumber, onCoordinatesChange]);

  const handleSearch = async () => {
    if (!inputLocation.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          inputLocation
        )}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        const coords = `${lat.toFixed(6)},${lon.toFixed(6)}`;
        
        if (mapRef.current) {
          mapRef.current.setView([lat, lon], 12);
          
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lon]);
          } else {
            markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
          }
          
          markerRef.current.bindPopup(`${inputLocation}: ${coords}`).openPopup();
          onCoordinatesChange?.(coords);
        }
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={dayNumber === 0 ? "Main Trip Location (e.g. Madrid, Spain)" : `Location for Day ${dayNumber} (e.g. Madrid, Spain)`}
            value={inputLocation}
            onChange={(e) => {
              setInputLocation(e.target.value);
              onLocationChange?.(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            className="w-full bg-[#FAFAFE] border border-[#EFEFEF] focus:border-[#0DAC87] h-11 rounded-md px-4 pr-10 text-sm outline-none transition-all"
          />
          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-[#0DAC87] hover:bg-[#0b9675] disabled:bg-gray-300 text-white px-4 rounded-md transition-colors flex items-center gap-2 text-sm font-medium"
        >
          {isSearching ? <div className="animate-spin size-4 border-2 border-white/30 border-t-white rounded-full" /> : <Search size={16} />}
          Search
        </button>
      </div>
      <div
        ref={mapContainer}
        className="rounded-xl border border-[#EFEFEF] overflow-hidden shadow-sm"
        style={{ height: "300px", width: "100%" }}
      />
      {coordinates && (
        <div className="bg-[#F5FFF5] border border-[#0DAC87]/20 rounded-md px-4 py-2 text-xs text-[#0DAC87] font-medium flex justify-between items-center">
          <span>Coordinates: {coordinates}</span>
          <button 
            type="button"
            className="text-xs underline hover:no-underline"
            onClick={() => onCoordinatesChange?.("")}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
